export interface UserWallet {
  name: string;
  address: string;
  encryptedPrivateKey: string;
  salt: string;
}

export interface WalletStore {
  wallets: UserWallet[];
  activeWallet?: UserWallet;
  addWallet: (wallet: UserWallet) => void;
  removeWallet: (address: string) => void;
  setActiveWallet: (address: string) => void;
}
