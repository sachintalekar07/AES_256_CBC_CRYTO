const cryptoFunc = require('./index')

const { encrypt, decrypt } = cryptoFunc

const data = { name: 'John Doe', age: 30, email: 'john.doe@sample.com' }

const encryptedData = encrypt(data)
console.log('Encrypted data:', encryptedData)

const decryptedData = decrypt(encryptedData.IV, encryptedData.encryptedData)
console.log('Decrypted data:', decryptedData)
