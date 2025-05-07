import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { encryptPrivateKey } from './crypto'

export const generateWallet = ({ name, password }: { name: string; password: string }) => {
	try {
		const privateKey = generatePrivateKey()
		const account = privateKeyToAccount(privateKey)

		const _newAccount = {
			name,
			address: account.address,
			...encryptPrivateKey({ password, privateKey }),
		}

		return _newAccount
	} catch (error) {
		throw new Error('Failed to generate wallet: ' + (error as Error).message)
	}
}
