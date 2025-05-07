import type { Address, Chain } from "viem"

export interface UserWallet {
	name: string
	address: string
	encryptedPrivateKey: string
	salt: string
}

export interface Token {
	name: string
	symbol: string
	decimals: number
	address: Address
	chainId: number
}

export interface WalletStore {
	wallets: UserWallet[]
	activeWallet?: UserWallet
	activeChain: Chain,
	tokens: []
	addWallet: (wallet: UserWallet) => void
	removeWallet: (address: string) => void
	setActiveWallet: (address: string) => void
}