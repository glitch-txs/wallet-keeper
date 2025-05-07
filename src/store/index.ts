import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WalletStore } from '../types'
import { sepolia, type Chain } from 'viem/chains'
import type { Address } from 'viem'
import { getTokenProperties } from '../utils/token'
import { generateWallet } from '../utils/wallet'

export const useWalletStore = create<WalletStore>()(
	persist(
		(set, get) => ({
			wallets: [],
			activeWallet: undefined,
			activeChain: sepolia,
			tokens: [],

			addWallet: ({ name, password }: { name: string; password: string }) => {
				const newWallet = generateWallet({ name, password })
				set((state) => ({
					wallets: [...state.wallets, newWallet],
				}))
				set({ activeWallet: newWallet })

				return newWallet
			},

			removeWallet: (address: string) => {
				set((state) => ({
					wallets: state.wallets.filter((w) => w.address !== address),
					activeWallet:
						state.activeWallet?.address === address
							? state.wallets.filter((w) => w.address !== address)[0]
							: state.activeWallet,
				}))
			},

			setActiveWallet: (address: string) => {
				const wallet = get().wallets.find((w) => w.address === address)
				if (wallet) {
					set({ activeWallet: wallet })
				}
			},

			addToken: async ({ address, chain }: { address: Address; chain: Chain }) => {
				const newToken = await getTokenProperties({ address, chain })
				set((state) => ({
					tokens: [...state.tokens, newToken],
				}))

				return newToken
			},

			removeToken: (address: string) => {
				set((state) => ({
					tokens: state.tokens.filter((t) => t.address !== address),
				}))
			},

			setActiveChain: (chain: Chain) => {
				set({ activeChain: chain })
			},
		}),
		{
			name: 'wallet-storage',
			partialize: (state) => ({
				wallets: state.wallets,
				activeWallet: state.activeWallet,
				tokens: state.tokens,
				activeChain: state.activeChain,
			}),
		},
	),
)
