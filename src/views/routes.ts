import Balance from './balance'
import Wallets from './wallets'

export const ROUTES = [
	{
		path: '/balance',
		Element: Balance,
		label: 'Balance',
	},
	{
		path: '/',
		Element: Wallets,
		label: 'Wallets',
	},
]
