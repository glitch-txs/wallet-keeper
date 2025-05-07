import CryptoJS from 'crypto-js';
import type { UserWallet } from '../types';

export const encryptPrivateKey = (privateKey: string, password: string): Pick<UserWallet, 'encryptedPrivateKey' | 'salt'> => {
  const salt = CryptoJS.lib.WordArray.random(16).toString();
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 100000,
  }).toString();

  const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, key).toString();

  return {
    encryptedPrivateKey,
    salt,
  };
};

export const decryptPrivateKey = (
  encryptedPrivateKey: string,
  password: string,
  salt: string
): string | null => {
  try {
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 100000,
    }).toString();
    
    const decrypted = CryptoJS.AES.decrypt(encryptedPrivateKey, key);
    const privateKey = decrypted.toString(CryptoJS.enc.Utf8);

    return privateKey || null;
  } catch (e) {
    console.error("Decryption failed:", (e as Error).message);
    return null;
  }
};
