import crypto from "crypto";

const algorithm = "aes-256-gcm";
const secret = process.env.CRYPTO_KEY as string;
if (!secret) {
  throw new Error("CRYPTO_KEY is undefined");
}

export function encrypt(text: string) {
  console.log("secret", secret);
  const iv = crypto.randomBytes(16);
  const key = Buffer.from(secret, "hex"); // Store ENCRYPTION_KEY as hex in .env
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

export function decrypt(payload: string) {
  const [ivHex, authTagHex, encrypted] = payload.split(":");
  const key = Buffer.from(secret, "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex"),
  );
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
