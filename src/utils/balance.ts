import { createPublicClient, erc20Abi, formatEther, formatUnits, http, type Chain } from 'viem'
import type { Token } from '../types'

export async function getTokenWithBalance({
	chain,
	token,
	userAddress,
}: { chain: Chain; userAddress: `0x${string}`; token?: Token }): Promise<
	Pick<Token, 'name' | 'symbol'> & { formattedBalance: string | undefined }
> {
	const publicClient = createPublicClient({
		chain,
		transport: http(),
	})

	if (!token) {
		const balance = await publicClient.getBalance({
			address: userAddress,
		})

		return {
			name: chain.nativeCurrency.name,
			symbol: chain.nativeCurrency.symbol,
			formattedBalance: balance ? formatEther(balance) : '0',
		}
	}

	const bigIntBalance = await publicClient.readContract({
		address: token.address,
		abi: erc20Abi,
		functionName: 'balanceOf',
		args: [userAddress],
	})

	const formattedBalance = formatUnits(bigIntBalance, token.decimals)

	return {
		name: token.name,
		symbol: token.symbol,
		formattedBalance,
	}
}
