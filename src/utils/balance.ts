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

		const formattedBalance = balance ? Number(formatEther(balance)).toFixed(4) : '0.0000';

		return {
			name: chain.nativeCurrency.name,
			symbol: chain.nativeCurrency.symbol,
			formattedBalance,
		}
	}

	const bigIntBalance = await publicClient.readContract({
		address: token.address,
		abi: erc20Abi,
		functionName: 'balanceOf',
		args: [userAddress],
	})

	const formattedBalance = Number(formatUnits(bigIntBalance, token.decimals)).toFixed(4);

	return {
		name: token.name,
		symbol: token.symbol,
		formattedBalance,
	}
}
