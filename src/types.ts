export interface UserWallet {
  name: string;
  address: string;
  encryptedPrivateKey: string;
  salt: string;
}