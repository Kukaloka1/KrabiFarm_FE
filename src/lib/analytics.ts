import { ENV } from '@/config/env'
export function initAnalytics(){
  if (ENV.ANALYTICS === 'plausible'){
    // TODO: inject plausible script
  } else if (ENV.ANALYTICS === 'ga4'){
    // TODO: inject GA4 gtag
  }
}
