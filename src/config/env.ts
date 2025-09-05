export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'KrabiFarm',
  ANALYTICS: (import.meta.env.VITE_ANALYTICS ?? 'none') as 'none'|'plausible'|'ga4',
  API_BASE: import.meta.env.VITE_API_BASE ?? '',
}
