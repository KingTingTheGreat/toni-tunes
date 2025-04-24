import { createHmac } from "crypto";
import { base64UrlDecode, base64UrlEncode } from "./b64";
import { JwtClaims, VerifyJwtRes } from "@/types/types";
import { decrypt, encrypt } from "./crypt";

const signingKey = process.env.SIGNING_KEY as string;
if (!signingKey) {
  throw new Error("SIGNING_KEY is undefined");
}

const jwtHeader = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));

function jwtSignature(data: string): string {
  return createHmac("sha256", signingKey)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function createJwt(claims: JwtClaims): string {
  if (claims.expiration === undefined) {
    claims.expiration = new Date();
    claims.expiration.setDate(claims.expiration.getDate() + 4); // expiration in days
  }

  // encrypt sensitive fields
  claims.accessToken = encrypt(claims.accessToken);
  claims.refreshToken = encrypt(claims.refreshToken);

  const payload = base64UrlEncode(JSON.stringify(claims));
  const signature = jwtSignature(`${jwtHeader}.${payload}`);

  return `${jwtHeader}.${payload}.${signature}`;
}

export function verifyJwt(jwt: string): VerifyJwtRes {
  const jwtParts = jwt.split(".");
  if (jwtParts.length !== 3) {
    return { verified: false };
  }

  const header = jwtParts[0];
  const payload = jwtParts[1];
  const signature = jwtParts[2];

  if (signature !== jwtSignature(`${header}.${payload}`)) {
    return { verified: false };
  }

  try {
    const claims = JSON.parse(base64UrlDecode(payload));

    // decrypt sensitive fields
    claims.accessToken = decrypt(claims.accessToken);
    claims.refreshToken = decrypt(claims.refreshToken);

    return { verified: true, claims };
  } catch {
    console.log("invalid json in jwt");
    return { verified: false };
  }
}
