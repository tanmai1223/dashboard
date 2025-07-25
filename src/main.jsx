import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { FavouriteProvider } from './context/FavouriteContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <FavouriteProvider>
    
      <App />
    
    </FavouriteProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
