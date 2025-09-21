/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readParams, setParams } from '@/lib/url'
import en from './dicts/en'
import th from './dicts/th'

export type Locale = 'en' | 'th'
type Dict = Record<string, any>
const dicts: Record<Locale, Dict> = { en, th }

type Ctx = { t:(path:string)=>any; lang:Locale; setLang:(l:Locale)=>void }
export const I18nCtx = createContext<Ctx>({ t:(k)=>k, lang:'en', setLang:()=>{} })

function resolveInitialLang(): Locale {
  const fromUrl = readParams().get('lang')
  if (fromUrl === 'en' || fromUrl === 'th') return fromUrl
  const fromLS = localStorage.getItem('lang')
  if (fromLS === 'en' || fromLS === 'th') return fromLS
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>(resolveInitialLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    setParams({ lang }, 'replace')
  }, [lang])

  const t = useMemo(() => (path: string) => {
    return path.split('.').reduce<any>(
      (acc, key) => (acc && acc[key] !== undefined) ? acc[key] : null,
      dicts[lang]
    ) ?? path
  }, [lang])

  return (
    <I18nCtx.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nCtx.Provider>
  )
}

export function useI18n(){ return useContext(I18nCtx) }
