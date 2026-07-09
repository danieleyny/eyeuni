import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './michaelsfloraldesign/mfd.css'
import MfdApp from './michaelsfloraldesign/MfdApp.jsx'

createRoot(document.getElementById('mfd-root')).render(
  <StrictMode>
    <MfdApp />
  </StrictMode>,
)
