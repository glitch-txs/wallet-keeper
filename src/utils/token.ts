import { createPublicClient, erc20Abi, getContract, http, type Address, type Chain } from 'viem'

export async function getTokenProperties({ address, chain }: { address: Address; chain: Chain }) {
	try {
		const publicClient = createPublicClient({
			batch: {
				multicall: Boolean(chain.contracts?.multicall3),
			},
			chain,
			transport: http(),
		})

		const contract = getContract({ address, abi: erc20Abi, client: publicClient })

		const [name, decimals, symbol] = await Promise.all([
			contract.read.name(),
			contract.read.decimals(),
			contract.read.symbol(),
		])

		const _newToken = {
			address,
			name,
			symbol,
			decimals,
			chainId: chain.id,
		}

		return _newToken
	} catch (error) {
		console.error('Failed to add token: ' + (error as Error).message)
		return null
	}
}
