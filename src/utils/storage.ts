import type { UserWallet } from "../types";
import { CONSTANTS } from "./constants";

/* User Wallets */
export const saveWalletsToStorage = (wallets: UserWallet[]): void => {
  localStorage.setItem(CONSTANTS.WALLETS_KEY_STORAGE, JSON.stringify(wallets));
};

export const loadWalletsFromStorage = (): UserWallet[] => {
  const storedWallets = localStorage.getItem(CONSTANTS.WALLETS_KEY_STORAGE);
  return storedWallets ? JSON.parse(storedWallets) : [];
};

export const addWalletToStorage = (wallet: UserWallet): void => {
  const wallets = loadWalletsFromStorage();
  wallets.push(wallet);
  saveWalletsToStorage(wallets);
};

export const removeWalletFromStorage = (address: string): void => {
  const wallets = loadWalletsFromStorage();
  const updatedWallets = wallets.filter((w) => w.address !== address);
  saveWalletsToStorage(updatedWallets);
};

/* Active Wallet */
export const saveActiveWallet = (activeWallet: UserWallet): void => {
  localStorage.setItem(CONSTANTS.ACTIVE_WALLET_KEY_STORAGE, JSON.stringify(activeWallet));
};

export const getActiveWallet = (): UserWallet | null => {
  const activeWallet = localStorage.getItem(CONSTANTS.ACTIVE_WALLET_KEY_STORAGE);
  return activeWallet ? JSON.parse(activeWallet) : null;
};
