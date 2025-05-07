import type { Address, Chain } from 'viem'

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
	activeChain: Chain
	tokens: Token[]
	addWallet: ({ name, password }: { name: string; password: string }) => UserWallet
	removeWallet: (address: string) => void
	setActiveWallet: (address: string) => void
	addToken: ({ address, chain }: { address: Address; chain: Chain }) => Promise<Token>
	removeToken: (address: string) => void
	setActiveChain: (chain: Chain) => void
}
