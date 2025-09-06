import Header from '@/components/Header'
import Hero from '@/sections/Hero'
import WhyUs from '@/sections/WhyUs'
import Problem from '@/sections/Problem'
import Solution from '@/sections/Solution'
import Products from '@/sections/Products'
import Gallery from '@/sections/Gallery'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'

import InquiryDrawer from '@/features/inquiry/InquiryDrawer'
import InquiryFab from '@/features/inquiry/InquiryFab'
import { useState } from 'react'

export default function App(){
  const [openInquiry, setOpenInquiry] = useState(false)
  return (
    <div className="min-h-dvh bg-bg">
      <Header/>
      <main>
        <Hero/>
        <WhyUs/>
        <Problem/>
        <Solution/>
        <Products onAdded={()=>setOpenInquiry(true)}/>
        <Gallery/>
        <CTA/>
      </main>
      <Footer/>
      <InquiryFab onOpen={()=>setOpenInquiry(true)} />
      <InquiryDrawer open={openInquiry} onClose={()=>setOpenInquiry(false)} />
    </div>
  )
}
