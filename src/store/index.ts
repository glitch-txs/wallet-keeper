import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserWallet } from '../types';

interface WalletStore {
  wallets: UserWallet[];
  activeWallet?: UserWallet;
  addWallet: (wallet: UserWallet) => void;
  removeWallet: (address: string) => void;
  setActiveWallet: (address: string) => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      wallets: [],
      activeWallet: undefined,

      addWallet: (wallet: UserWallet) => {
        set((state) => ({
          wallets: [...state.wallets, wallet],
        }));
      },

      removeWallet: (address: string) => {
        set((state) => ({
          wallets: state.wallets.filter((w) => w.address !== address),
          activeWallet:
            state.activeWallet?.address === address ? undefined : state.activeWallet,
        }));
      },

      setActiveWallet: (address: string) => {
        const wallet = get().wallets.find((w) => w.address === address);
        if (wallet) {
          set({ activeWallet: wallet });
        }
      },
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({ wallets: state.wallets, activeWallet: state.activeWallet }),
    }
  )
);
