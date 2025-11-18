// src/lib/nonce.ts
import crypto from 'crypto';

export function generateNonce() {
  return Buffer.from(crypto.randomUUID()).toString('base64');
}
