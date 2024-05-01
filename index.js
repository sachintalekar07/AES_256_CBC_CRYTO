'use strict'

require('dotenv').config()
const crypto = require('crypto')
const randomString = require('randomstring')

const CRYPTOGRAPHY_CONFIG = { ALGO: 'aes-256-cbc', KEY: process.env.PROJECT_ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef' }

const { ALGO, KEY } = CRYPTOGRAPHY_CONFIG

const encrypt = (data, userKey) => {
  const thisKEY = userKey || KEY

  const iv = randomString.generate(16)
  const rawCipherData = crypto.createCipheriv(ALGO, thisKEY, iv)
  let cipherText = rawCipherData.update(JSON.stringify(data), 'utf8', 'hex')
  cipherText += rawCipherData.final('hex')
  return { IV: iv, encryptedData: cipherText }
}

const decrypt = (iv, data, userKey) => {
  const thisKEY = userKey || KEY
  if (typeof iv === 'object') return 'iv can\'t be object, it should be string.'
  if (iv === null || iv === undefined || iv === '') return 'Invalid iv to decrypt'
  if (data === null || data === undefined || data === '' || data === '') return 'Invalid data to decrypt'
  const decryptedData = crypto.createDecipheriv(ALGO, thisKEY, iv)
  const decryptedText = decryptedData.update(data, 'hex', 'utf8')

  return JSON.parse(decryptedText + decryptedData.final('utf8'))
}

module.exports = { encrypt, decrypt }
