import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './layout/navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ROUTES } from './views/routes'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					{ROUTES.map(({ path, Element }) => (
						<Route path={path} element={<Element />} />
					))}
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
)
