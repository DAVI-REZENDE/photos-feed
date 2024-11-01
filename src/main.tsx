import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './App.tsx'
import './index.css'

const queryCLient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryCLient}>
      <Home />
    </QueryClientProvider>
  </StrictMode>,
)
