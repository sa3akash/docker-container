const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from('YOUR_SECRET_KEY', 'hex');
const iv = Buffer.from('YOUR_IV', 'hex');

function encrypt(data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted.toString()
    };
  }
  
  const dataToEncrypt = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
  const encryptedData = encrypt(dataToEncrypt);
  console.log(encryptedData);
  res.json(encryptedData)