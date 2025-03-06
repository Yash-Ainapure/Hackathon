const CryptoJS = require("crypto-js");
require("dotenv").config();

const SECRET_KEY = process.env.CRYPTO_SECRET;
if (!SECRET_KEY) {
  throw new Error("CRYPTO_SECRET is not defined in environment variables!");
}

const SECRET_KEY_PARSED = CryptoJS.enc.Utf8.parse(SECRET_KEY); // Convert key to WordArray
const IV = CryptoJS.enc.Utf8.parse("1234567890123456"); // Ensure IV is 16 bytes

/**
 * Encrypts a value using AES encryption (with fixed IV for consistency)
 */
const encrypt = (text) => {
  if (!text) return text;

  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY_PARSED, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};

/**
 * Decrypts an AES encrypted value
 */
const decrypt = (cipherText) => {
  if (!cipherText || typeof cipherText !== "string") {
    console.log("Invalid cipherText:", cipherText);
    return cipherText;
  }
  
  try {
    const decrypted = CryptoJS.AES.decrypt(cipherText, SECRET_KEY_PARSED, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      // console.error("Decryption failed, returning raw cipherText:", cipherText);
      return "[Decryption Error]";
    }

    return decrypted;
  } catch (error) {
    // console.error("Decryption failed for:", cipherText, error);
    return "[Decryption Error]";
  }
};


module.exports = { encrypt, decrypt };
