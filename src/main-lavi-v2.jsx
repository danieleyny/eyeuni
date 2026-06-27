import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lavi-v2/lavi.css'
import LaviApp from './lavi-v2/LaviApp.jsx'

createRoot(document.getElementById('lavi-root')).render(
  <StrictMode>
    <LaviApp />
  </StrictMode>,
)
