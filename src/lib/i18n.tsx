import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { readParams, setParams } from '@/lib/url'

type Locale = 'en' | 'th'
type Dict = Record<string, any>

const dicts: Record<Locale, Dict> = {
  en: {
    nav: { about:'About', why:'Why Us', problem:'Problem', solution:'Solution', products:'Products', gallery:'Gallery', cta:'Contact' },
    hero: {
      title:'Fresh & Verified from Local Farms',
      subtitle:'Direct from Krabi’s farms to hotels, restaurants and families. QR payments, traceability and collaborative logistics.',
      primary:'Browse Products', secondary:'Contact'
    },
    about: {
      title:'About',
      body:'A practical backbone for the Krabi Smart Region. We enable direct sales, digital payments (QR/PromptPay), and lot-level traceability for verified producers.'
    },
    why: { title:'Why choose us', list:[
      'Verified producers and origin transparency',
      'Fair pricing with direct sales',
      'Local logistics with reliable partners'
    ]},
    problem: { title:'Problem', body:'Low and unstable farmer margins, little traceability, and logistics friction limit growth and trust.' },
    solution: { title:'Solution', list:[
      'Direct B2C & B2B sales (marketplace EN/TH)',
      'Instant QR payments; TouristDigiPay-ready',
      'Lot-level QR traceability with chain anchoring',
      'B2B tiers and delivery scheduling',
      'Collaborative hubs (markets, hotels, airport)'
    ]},
    products: {
      title:'Products', subtitle:'Filter by category, producer and availability. Toggle B2B tiers or group by producer.',
      search:'Search products or producers…', producerAll:'All producers', verifiedOnly:'Verified only', inSeasonOnly:'In season',
      b2bView:'B2B view', groupBy:'Group by producer',
      sort:{ newest:'Newest', priceAsc:'Price ↑', priceDesc:'Price ↓', popular:'Popular' },
      status:{ in:'In season', out:'Out of season', limited:'Limited' },
      actions:{ add:'Add to Inquiry', tiersShow:'View tiers', tiersHide:'Hide tiers', trace:'Traceability' }
    },
    gallery: { title:'Gallery', subtitle:'Authentic produce and co-op logistics across Krabi.' },
    cta: {
      title:'Ready to order?',
      subtitle:'Message us on WhatsApp or pay via PromptPay. For B2B, ask about delivery schedules and tiers.',
      whatsapp:'WhatsApp', email:'Email', promptpay:'PromptPay'
    },
    footer:{ legal:'All rights reserved.' }
  },
  th: {
    nav: { about:'เกี่ยวกับ', why:'ทำไมต้องเรา', problem:'ปัญหา', solution:'ทางแก้', products:'สินค้า', gallery:'แกลเลอรี', cta:'ติดต่อ' },
    hero: {
      title:'สดใหม่และผ่านการยืนยันจากฟาร์มท้องถิ่น',
      subtitle:'จากฟาร์มในกระบี่ถึงโรงแรม ร้านอาหาร และครอบครัว ชำระเงินด้วยคิวอาร์ ติดตามย้อนกลับได้ และโลจิสติกส์แบบร่วมมือ',
      primary:'ดูสินค้า', secondary:'ติดต่อ'
    },
    about: {
      title:'เกี่ยวกับ',
      body:'โครงสร้างพื้นฐานสำหรับ Krabi Smart Region เราสนับสนุนการขายโดยตรง การชำระเงินดิจิทัล (QR/พร้อมเพย์) และการติดตามย้อนกลับระดับล็อตสำหรับผู้ผลิตที่ผ่านการตรวจสอบ'
    },
    why: { title:'ทำไมต้องเรา', list:[
      'ผู้ผลิตผ่านการยืนยันและโปร่งใสแหล่งที่มา',
      'ราคายุติธรรมด้วยการขายโดยตรง',
      'โลจิสติกส์ท้องถิ่นที่เชื่อถือได้'
    ]},
    problem: { title:'ปัญหา', body:'กำไรเกษตรกรต่ำและไม่แน่นอน การติดตามย้อนกลับมีจำกัด และโลจิสติกส์ติดขัด' },
    solution: { title:'ทางแก้', list:[
      'การขายทั้ง B2C และ B2B (ตลาดสองภาษา EN/TH)',
      'ชำระเงินด้วยคิวอาร์ทันที รองรับ TouristDigiPay',
      'ติดตามย้อนกลับระดับล็อตพร้อมเชื่อมโยงบล็อกเชน',
      'ราคาแบบขั้นบันได B2B และกำหนดเวลาจัดส่ง',
      'ฮับโลจิสติกส์แบบร่วมมือ (ตลาด โรงแรม สนามบิน)'
    ]},
    products: {
      title:'สินค้า', subtitle:'กรองตามหมวดหมู่ ผู้ผลิต และฤดูกาล สลับมุมมอง B2B หรือจัดกลุ่มตามผู้ผลิต',
      search:'ค้นหาสินค้าหรือผู้ผลิต…', producerAll:'ผู้ผลิตทั้งหมด', verifiedOnly:'เฉพาะที่ยืนยันแล้ว', inSeasonOnly:'ตามฤดูกาล',
      b2bView:'มุมมอง B2B', groupBy:'จัดกลุ่มตามผู้ผลิต',
      sort:{ newest:'ล่าสุด', priceAsc:'ราคาน้อย→มาก', priceDesc:'ราคามาก→น้อย', popular:'ยอดนิยม' },
      status:{ in:'ตามฤดูกาล', out:'นอกฤดูกาล', limited:'จำกัด' },
      actions:{ add:'เพิ่มในแบบฟอร์มสอบถาม', tiersShow:'ดูราคาแบบขั้น', tiersHide:'ซ่อนราคาแบบขั้น', trace:'การติดตามย้อนกลับ' }
    },
    gallery: { title:'แกลเลอรี', subtitle:'ผลผลิตแท้และโลจิสติกส์สหกรณ์ทั่วกระบี่' },
    cta: {
      title:'พร้อมสั่งซื้อหรือยัง?',
      subtitle:'ติดต่อผ่าน WhatsApp หรือชำระผ่าน PromptPay สำหรับลูกค้าองค์กร สอบถามรอบส่งและราคาปริมาณได้',
      whatsapp:'WhatsApp', email:'อีเมล', promptpay:'พร้อมเพย์'
    },
    footer:{ legal:'สงวนลิขสิทธิ์' }
  }
}

type Ctx = { t:(path:string)=>string; lang:Locale; setLang:(l:Locale)=>void }
const I18nCtx = createContext<Ctx>({ t:(k)=>k, lang:'en', setLang:()=>{} })

function resolveInitialLang(): Locale {
  const fromUrl = readParams().get('lang')
  if (fromUrl === 'en' || fromUrl === 'th') return fromUrl
  const fromLS = localStorage.getItem('lang')
  if (fromLS === 'en' || fromLS === 'th') return fromLS
  return 'en'
}

export function I18nProvider({children}:{children:ReactNode}){
  const [lang,setLang] = useState<Locale>(resolveInitialLang)
  useEffect(()=>{
    localStorage.setItem('lang', lang)
    setParams({ lang }, 'replace')
  },[lang])

  const t = useMemo(()=> (path:string)=>{
    return path.split('.').reduce<any>((acc,key)=> (acc && acc[key] !== undefined)? acc[key] : null, dicts[lang]) ?? path
  },[lang])
  return <I18nCtx.Provider value={{t,lang,setLang}}>{children}</I18nCtx.Provider>
}
export function useI18n(){ return useContext(I18nCtx) }
