// A general purpose data decryption with AES-256-CBC algorithm.

const crypto = require('crypto');

function decrypt(data) {
  const algorithm = 'aes-256-cbc';
  const key = process.env.ENCRYPTION_KEY;

  // The Initialization Vector (IV) is usually passed along with the ciphertext.
  const pair = data.split(':');
  const hexString = pair[0];
  const iv = Buffer.from(hexString, 'hex');

  // Creating Decipher
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  // Updating encrypted text
  let encryptedText = Buffer.from(pair[1], 'hex');
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Returns data after decryption
  return decrypted.toString();
}

module.exports = decrypt;
