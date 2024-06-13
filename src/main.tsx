import React from 'react'
import ReactDOM from 'react-dom/client'
import AppContextProvider from './AppContextProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider />
  </React.StrictMode>,
)
