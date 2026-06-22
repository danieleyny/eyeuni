import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Private V2 build, served at /V2.html — the full original site (all sections).
// wildcardHome lets its home route match the /V2.html path.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App wildcardHome />
    </BrowserRouter>
  </StrictMode>,
)
