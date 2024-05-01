'use strict'

require('dotenv').config()
const crypto = require('crypto')
const randomString = require('randomstring')

// Configuration constants
const ALGO = 'aes-256-cbc'
const KEY = process.env.PROJECT_ENCRYPTION_KEY

// Check that the encryption key is set
if (!KEY) {
  throw new Error('Encryption key is not set in the environment variables.')
}

// Generate a 16-byte initialization vector
const generateIV = () => randomString.generate(16)

// Get encryption key; use the user-provided key or fall back to the environment key
const getKey = userKey => userKey || KEY

// Encrypt data with AES-256-CBC
const encrypt = (data, userKey) => {
  if (typeof data !== 'object' || Object.keys(data).length === 0) {
    throw new TypeError('Data should be a non-empty object.')
  }

  const iv = generateIV()
  const thisKEY = getKey(userKey)
  const cipher = crypto.createCipheriv(ALGO, thisKEY, iv)
  let cipherText = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  cipherText += cipher.final('hex')

  return { IV: iv, encryptedData: cipherText }
}

// Decrypt data with AES-256-CBC
const decrypt = (iv, encryptedData, userKey) => {
  if (typeof iv !== 'string' || !iv) {
    throw new Error('Invalid IV: Must be a non-empty string.')
  }
  if (!encryptedData) {
    throw new Error('Invalid encrypted data: Data to decrypt cannot be empty.')
  }

  const thisKEY = getKey(userKey)
  const decipher = crypto.createDecipheriv(ALGO, thisKEY, iv)
  let decryptedText = decipher.update(encryptedData, 'hex', 'utf8')

  try {
    decryptedText += decipher.final('utf8')
    return JSON.parse(decryptedText)
  } catch (e) {
    throw new Error('Failed to parse decrypted data as JSON.')
  }
}

module.exports = { encrypt, decrypt }
