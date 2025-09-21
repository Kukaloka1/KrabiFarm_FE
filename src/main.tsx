//main.tsx//
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import App from './App'
import Playground from './Playground'
import { I18nProvider } from '@/lib/i18n'
import { enableManualScrollRestoration } from '@/lib/scroll'
import { InquiryProvider } from '@/features/inquiry/InquiryContext'
import { initAOS } from '@/lib/aos'
import { initAnalytics } from '@/lib/analytics'

enableManualScrollRestoration()
initAOS()
initAnalytics()

const showPlayground = new URLSearchParams(location.search).get('playground') === '1'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <InquiryProvider>
        {showPlayground ? <Playground/> : <App />}
      </InquiryProvider>
    </I18nProvider>
  </React.StrictMode>
)
