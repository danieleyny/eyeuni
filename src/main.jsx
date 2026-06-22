import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Public site (main page) = the light V3 site.
document.documentElement.dataset.theme = 'light'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App trimmed theme="light" />
    </BrowserRouter>
  </StrictMode>,
)
