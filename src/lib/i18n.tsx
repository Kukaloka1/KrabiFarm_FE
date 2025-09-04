import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

type Locale = 'en' | 'th'
type Dict = Record<string, any>

const dicts: Record<Locale, Dict> = {
  en: {
    nav: { about:'About', why:'Why Us', problem:'Problem', solution:'Solution', products:'Products', gallery:'Gallery', cta:'Contact', },
    hero: {
      title:'Fresh & Verified from Local Farms',
      subtitle:'Direct from Krabi’s farms to hotels, restaurants and families. QR payments, traceability and collaborative logistics.',
      primary:'Browse Products', secondary:'Contact'
    },
    about: { title:'About', body:'We connect verified producers and buyers with direct sales, digital payments and traceability.' },
    products: {
      title: 'Products',
      subtitle: 'Filter by category, producer and availability. Toggle B2B tiers or group by producer.',
      search: 'Search products or producers…',
      producerAll: 'All producers',
      verifiedOnly: 'Verified only',
      inSeasonOnly: 'In season',
      b2bView: 'B2B view',
      groupBy: 'Group by producer',
      sort: { newest: 'Newest', priceAsc: 'Price ↑', priceDesc: 'Price ↓', popular: 'Popular' },
    },
    gallery: { title:'Gallery', subtitle:'Authentic produce and co-op logistics across Krabi.' },
    cta: {
      title: 'Ready to order?',
      subtitle: 'Message us on WhatsApp or pay via PromptPay. For B2B, ask about delivery schedules and tiers.',
      whatsapp: 'WhatsApp', email: 'Email', promptpay: 'PromptPay'
    },
  },
  th: {
    nav: { about:'เกี่ยวกับ', why:'ทำไมต้องเรา', problem:'ปัญหา', solution:'ทางแก้', products:'สินค้า', gallery:'แกลเลอรี', cta:'ติดต่อ', },
    hero: {
      title:'สดใหม่และผ่านการยืนยันจากฟาร์มท้องถิ่น',
      subtitle:'จากฟาร์มในกระบี่ถึงโรงแรม ร้านอาหาร และครอบครัว ชำระเงินด้วยคิวอาร์ ติดตามย้อนกลับได้ และโลจิสติกส์แบบร่วมมือ',
      primary:'ดูสินค้า', secondary:'ติดต่อ'
    },
    about: { title:'เกี่ยวกับ', body:'เราเชื่อมผู้ผลิตที่ผ่านการตรวจสอบกับผู้ซื้อ ด้วยการขายโดยตรง การชำระเงินดิจิทัล และการติดตามย้อนกลับ' },
    products: {
      title: 'สินค้า',
      subtitle: 'กรองตามหมวดหมู่ ผู้ผลิต และฤดูกาล สลับมุมมอง B2B หรือจัดกลุ่มตามผู้ผลิต',
      search: 'ค้นหาสินค้าหรือผู้ผลิต…',
      producerAll: 'ผู้ผลิตทั้งหมด',
      verifiedOnly: 'เฉพาะที่ยืนยันแล้ว',
      inSeasonOnly: 'ตามฤดูกาล',
      b2bView: 'มุมมอง B2B',
      groupBy: 'จัดกลุ่มตามผู้ผลิต',
      sort: { newest: 'ล่าสุด', priceAsc: 'ราคาน้อย→มาก', priceDesc: 'ราคามาก→น้อย', popular: 'ยอดนิยม' },
    },
    gallery: { title:'แกลเลอรี', subtitle:'ผลผลิตแท้และโลจิสติกส์สหกรณ์ทั่วกระบี่' },
    cta: {
      title: 'พร้อมสั่งซื้อหรือยัง?',
      subtitle: 'ติดต่อผ่าน WhatsApp หรือชำระผ่าน PromptPay สำหรับลูกค้าองค์กร สอบถามรอบส่งและราคาปริมาณได้',
      whatsapp: 'WhatsApp', email: 'อีเมล', promptpay: 'พร้อมเพย์'
    },
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
