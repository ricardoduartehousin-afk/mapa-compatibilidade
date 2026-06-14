import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/base.css'
import './styles/form.css'
import './styles/paywall.css'
import './styles/report.css'
import './styles/utilities.css'
import App from './App.jsx'
import DevBadge from './components/DevBadge'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DevBadge>
        <App />
      </DevBadge>
    </BrowserRouter>
  </StrictMode>,
)
