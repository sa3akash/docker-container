const express = require("express");
const cors = require("cors");
const app = express();
const crypto = require("crypto");

app.use(cors());
app.use(express.json());

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

app.get("/get",(req,res)=>{
  
})

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

app.listen(5500, () => console.log("server started on port 5500"));
