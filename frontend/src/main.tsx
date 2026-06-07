// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { Home } from './home'
import { HashRouter } from 'react-router-dom'
import { RouteApp } from './routes'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <RouteApp />
  </HashRouter>,
)
