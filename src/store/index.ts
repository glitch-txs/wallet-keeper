import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserWallet, WalletStore } from '../types';

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
            state.activeWallet?.address === address ? state.wallets.filter((w) => w.address !== address)[0] : state.activeWallet,
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
