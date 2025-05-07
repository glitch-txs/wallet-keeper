import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { encryptPrivateKey } from './crypto'
import { useWalletStore } from '../store'

export const generateWallet = ({ name, password }: { name: string; password: string }) => {
	try {
		const privateKey = generatePrivateKey()
		const account = privateKeyToAccount(privateKey)

		const _newAccount = {
			name,
			address: account.address,
			...encryptPrivateKey({ password, privateKey }),
		}
		useWalletStore.getState().addWallet(_newAccount)
		useWalletStore.getState().setActiveWallet(_newAccount.address)

		return _newAccount
	} catch (error) {
		throw new Error('Failed to generate wallet: ' + (error as Error).message)
	}
}
