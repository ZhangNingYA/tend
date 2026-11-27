import { randomBytes, scryptSync } from 'node:crypto';

const password = process.argv[2];
if (!password) {
  console.error('Usage: node server/hash-password.mjs "a-long-passphrase"');
  process.exit(1);
}

const cost = 16384;
const blockSize = 8;
const parallelism = 1;
const salt = randomBytes(16);
const digest = scryptSync(password, salt, 32, {
  N: cost,
  r: blockSize,
  p: parallelism,
  maxmem: 64 * 1024 * 1024,
});

console.log(`scrypt$${cost}$${blockSize}$${parallelism}$${salt.toString('base64url')}$${digest.toString('base64url')}`);
