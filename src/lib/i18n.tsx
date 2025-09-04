import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

type Locale = 'en' | 'th'
type Dict = Record<string, any>

const dicts: Record<Locale, Dict> = {
  en: {
    nav: { about:'About', why:'Why Us', problem:'Problem', solution:'Solution', products:'Products', gallery:'Gallery', cta:'Contact', },
    hero: { title:'KrabiFarm — Fresh & Verified', subtitle:'Direct from local farms to hotels, restaurants and families. QR payments, traceability and collaborative logistics.', primary:'Browse Products', secondary:'Contact' },
    about: { title:'About KrabiFarm', body:'A practical backbone for the Krabi Smart Region: verified producers, direct sales, digital payments and traceability.' },
  },
  th: {
    nav: { about:'เกี่ยวกับ', why:'ทำไมต้องเรา', problem:'ปัญหา', solution:'ทางแก้', products:'สินค้า', gallery:'แกลเลอรี', cta:'ติดต่อ', },
    hero: { title:'KrabiFarm — สดใหม่และผ่านการยืนยัน', subtitle:'จากเกษตรกรท้องถิ่นถึงโรงแรม ร้านอาหาร และครอบครัว ชำระเงินด้วยคิวอาร์ ติดตามย้อนกลับได้ และโลจิสติกส์แบบร่วมมือ', primary:'ดูสินค้า', secondary:'ติดต่อ' },
    about: { title:'เกี่ยวกับ KrabiFarm', body:'โครงสร้างพื้นฐานสำหรับ Krabi Smart Region: ผู้ผลิตที่ผ่านการตรวจสอบ การขายโดยตรง การชำระเงินดิจิทัล และการติดตามย้อนกลับ' },
  }
}

type Ctx = { t: (path: string)=>string; lang: Locale; setLang: (l:Locale)=>void }
const I18nCtx = createContext<Ctx>({ t: (k)=>k, lang:'en', setLang: ()=>{} })

export function I18nProvider({children}:{children:ReactNode}){
  const [lang,setLang] = useState<Locale>(() => (localStorage.getItem('lang') as Locale) || 'en')
  useEffect(()=>{ localStorage.setItem('lang', lang) },[lang])
  const t = useMemo(()=> (path:string)=>{
    return path.split('.').reduce<any>((acc,key)=> (acc && acc[key] !== undefined)? acc[key] : null, dicts[lang]) ?? path
  },[lang])
  return <I18nCtx.Provider value={{t,lang,setLang}}>{children}</I18nCtx.Provider>
}

export function useI18n(){ return useContext(I18nCtx) }
