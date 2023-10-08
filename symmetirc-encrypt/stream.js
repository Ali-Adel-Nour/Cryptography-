const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');
const fs = require('fs');

// Input and output file paths
const inputFile = 'input.txt';
const encryptedFile = 'encrypted.txt';
const decryptedFile = 'decrypted.txt';

// Generate random key and IV
const key = randomBytes(32);
const iv = randomBytes(16);

// Create a writable stream to encrypt and write to encrypted file
const encryptStream = createCipheriv('aes256', key, iv);
const writeStream = fs.createWriteStream(encryptedFile);

// Read input file, encrypt, and write to encrypted file using streams
const readStream = fs.createReadStream(inputFile);
readStream.pipe(encryptStream).pipe(writeStream);

writeStream.on('finish', () => {
  console.log(`File encrypted and saved as ${encryptedFile}`);

  // Create a readable stream from encrypted file and decrypt it
  const encryptedReadStream = fs.createReadStream(encryptedFile);
  const decryptStream = createDecipheriv('aes256', key, iv);
  const decryptedWriteStream = fs.createWriteStream(decryptedFile);

  encryptedReadStream.pipe(decryptStream).pipe(decryptedWriteStream);

  decryptedWriteStream.on('finish', () => {
    console.log(`File decrypted and saved as ${decryptedFile}`);
  });
});