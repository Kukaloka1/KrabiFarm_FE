import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import App from './App'
import { I18nProvider } from '@/lib/i18n'
import { enableManualScrollRestoration } from '@/lib/scroll'

enableManualScrollRestoration()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
)
