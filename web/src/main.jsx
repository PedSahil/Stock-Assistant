import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Products from './products/Products'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
