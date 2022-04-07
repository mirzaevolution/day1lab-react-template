import * as CryptoJS from 'crypto-js';
import { SecurityPipeline } from '../constant/security.contants';

const base64Parse = (value: string): CryptoJS.lib.WordArray => {
  return CryptoJS.enc.Base64.parse(value);
}

const getPasswordArray = (password: string, salt: CryptoJS.lib.WordArray): CryptoJS.lib.WordArray => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 8,
    iterations: 10_000
  });
}

export const decrypt = (cipherText: string): any => {
  const ivWordArray: CryptoJS.lib.WordArray = base64Parse(SecurityPipeline.IV);
  const saltWordArray: CryptoJS.lib.WordArray = base64Parse(SecurityPipeline.SALT);
  const passwordWordArray: CryptoJS.lib.WordArray = getPasswordArray(SecurityPipeline.PASSWORD, saltWordArray);
  const decryptedCipherParams: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(cipherText, passwordWordArray, {
    iv: ivWordArray
  });
  const plainText: string = CryptoJS.enc.Utf8.stringify(decryptedCipherParams);
  return JSON.parse(plainText);
}

export const encrypt = (plainObject: object): string => {
  const plainObjectJson: string = JSON.stringify(plainObject);
  const ivWordArray: CryptoJS.lib.WordArray = base64Parse(SecurityPipeline.IV);
  const saltWordArray: CryptoJS.lib.WordArray = base64Parse(SecurityPipeline.SALT);
  const passwordWordArray: CryptoJS.lib.WordArray = getPasswordArray(SecurityPipeline.PASSWORD, saltWordArray);
  const encryptedCipherParams: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(plainObjectJson, passwordWordArray, {
    iv: ivWordArray
  });
  return encryptedCipherParams.toString();
}
