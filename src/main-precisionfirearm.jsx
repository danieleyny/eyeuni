import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './precisionfirearm/pfa.css'
import PfaApp from './precisionfirearm/PfaApp.jsx'

createRoot(document.getElementById('pfa-root')).render(
  <StrictMode>
    <PfaApp />
  </StrictMode>,
)
