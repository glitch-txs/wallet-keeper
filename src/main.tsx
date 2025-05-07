import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Wallets from './views/wallets'
import Balance from './views/balance'
import Navbar from './layout/navbar'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/balance" element={<Balance />} />
				<Route path="/" element={<Wallets />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
