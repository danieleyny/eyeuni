import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Private V2 build — a lighter cut of the site, served at /V2.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App v2 />
    </BrowserRouter>
  </StrictMode>,
)
