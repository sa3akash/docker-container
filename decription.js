const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from('YOUR_SECRET_KEY', 'hex');
const iv = Buffer.from('YOUR_IV', 'hex');

function decrypt(encryptedData) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}

const encryptedDataFromServer = {
  iv: '...',
  encryptedData: '...'
};
const decryptedData = decrypt(encryptedDataFromServer.encryptedData);
console.log(decryptedData);