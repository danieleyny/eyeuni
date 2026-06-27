import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lavi/lavi.css'
import LaviApp from './lavi/LaviApp.jsx'

createRoot(document.getElementById('lavi-root')).render(
  <StrictMode>
    <LaviApp />
  </StrictMode>,
)
