//测试代码专用文件
//
// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({b: 512});
// const publicDer = key.exportKey('pkcs8-public');
// const privateDer = key.exportKey('pkcs8-private');
// console.log(publicDer);
// console.log(privateDer)
// const text = '123456';
// const encrypted = key.encrypt(text, 'base64');
// console.log('encrypted: ', encrypted);
// const decrypted = key.decrypt(encrypted, 'utf8');
// console.log('decrypted: ', decrypted);
//
// const crytpo = require('crypto');
// let hmac = crytpo.createHmac("sha256", "TUST");
// let encryptPassword = hmac.update("asdsdf&^*555").digest("Base64");
// console.log(encryptPassword);

const { v1: uuidv1 } = require('uuid');
console.log(uuidv1());