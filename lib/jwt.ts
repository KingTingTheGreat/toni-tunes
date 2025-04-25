import { createSign, createVerify } from "crypto";
import { base64UrlDecode, base64UrlEncode } from "./b64";
import { JwtClaims, VerifyJwtRes } from "@/types/types";
import { decrypt, encrypt } from "./crypt";

const privateKey = process.env.SIGNING_KEY_PRIVATE as string;
const publicKey = process.env.NEXT_PUBLIC_SIGNING_KEY_PUBLIC as string;
if (!privateKey || !publicKey) {
  throw new Error("private or public signing key is undefined");
}

const jwtHeader = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));

function jwtSignature(data: string): string {
  const signer = createSign("RSA-SHA256");
  signer.update(data);
  signer.end();
  return signer.sign(privateKey, "base64url");
}

function verifySignature(data: string, signature: string): boolean {
  const verifier = createVerify("RSA-SHA256");
  verifier.update(data);
  verifier.end();
  return verifier.verify(publicKey, signature, "base64url");
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

  if (!verifySignature(`${header}.${payload}`, signature)) {
    return { verified: false };
  }

  try {
    const claims = JSON.parse(base64UrlDecode(payload));

    // decrypt sensitive fields
    claims.accessToken = decrypt(claims.accessToken);
    claims.refreshToken = decrypt(claims.refreshToken);

    if (!claims.expiration || claims.expiration < new Date()) {
      return { verified: false };
    }

    return { verified: true, claims };
  } catch {
    console.log("invalid json in jwt");
    return { verified: false };
  }
}
