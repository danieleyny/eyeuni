import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Private V3 build, served at /V3.html — the trimmed site in a Stripe/Apple-grade
// LIGHT theme. wildcardHome lets its home route match the /V3.html path.
document.documentElement.dataset.theme = 'light'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App trimmed theme="light" wildcardHome />
    </BrowserRouter>
  </StrictMode>,
)
