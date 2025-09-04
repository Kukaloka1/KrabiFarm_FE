import Header from '@/components/Header'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import WhyUs from '@/sections/WhyUs'
import ProblemSolution from '@/sections/ProblemSolution'
import Solution from '@/sections/Solution'
import Products from '@/sections/Products'
import Gallery from '@/sections/Gallery'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'

export default function App(){
  return (
    <>
      <Header/>
      <main>
        <Hero/>
        <About/>
        <WhyUs/>
        <ProblemSolution/>
        <Solution/>
        <Products/>
        <Gallery/>
        <CTA/>
      </main>
      <Footer/>
    </>
  )
}
