
# AES-256-CBC Cryptography Module

This Node.js module provides a simple and secure way to encrypt and decrypt data using the AES-256-CBC algorithm. It's designed to help developers implement robust encryption in their applications with minimal setup.

## Features

- **Secure Encryption**: Utilizes the strong AES-256-CBC encryption algorithm.
- **Easy Integration**: Simple API for encrypting and decrypting data.
- **Environment Variable Support**: Uses environment variables to manage encryption keys securely.

## Getting Started

### Prerequisites

You'll need Node.js installed on your machine. This project is tested with Node.js version 14.17.0 or higher. You can download Node.js [here](https://nodejs.org/).

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/sachintalekar07/AES_256_CBC_CRYTO.git
cd AES_256_CBC_CRYTO
npm install
```

### Usage

Here is a quick example of how to use this module:

```javascript
const { encrypt, decrypt } = require('./path_to_module');

const data = { name: 'John Doe', age: 30 };
const key = process.env.PROJECT_ENCRYPTION_KEY;  // Ensure your key is set in the environment variables

const encrypted = encrypt(data, key);
console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted.IV, encrypted.encryptedData, key);
console.log('Decrypted:', decrypted);
```

### Environment Variables

Make sure to set the following environment variables in your `.env` file:

```plaintext
PROJECT_ENCRYPTION_KEY=your_secure_key_here
```

## API Reference

### `encrypt(data, key)`

Encrypts the given data object using the specified key.

- **Parameters**:
  - `data` (Object): Data to be encrypted.
  - `key` (String): Encryption key.

- **Returns**:
  - Object containing `IV` and `encryptedData`.

### `decrypt(iv, encryptedData, key)`

Decrypts the given encrypted data using the specified key and IV.

- **Parameters**:
  - `iv` (String): Initialization vector.
  - `encryptedData` (String): Data to be decrypted.
  - `key` (String): Encryption key.

- **Returns**:
  - Decrypted data object.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE) file for details.

## Contact

For any queries, you can reach out to [Sachin Talekar].

## Acknowledgments

- Node.js community
- Crypto module contributors
