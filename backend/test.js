const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const publicDer = key.exportKey('pkcs8-public');
const privateDer = key.exportKey('pkcs8-private');
console.log(publicDer);
console.log(privateDer)
const text = '123456';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);