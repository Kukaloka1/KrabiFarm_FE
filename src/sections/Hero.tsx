import { useEffect, useState } from 'react'
import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'

import mango  from '@/assets/mango.jpeg'
import coco   from '@/assets/coco.jpeg'
import eggs   from '@/assets/eggs.jpeg'
import chilli from '@/assets/chilli.jpeg'
import basil  from '@/assets/basil.jpeg'

function useAutoplay(len: number, intervalMs: number) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % len), intervalMs)
    return () => clearInterval(id)
  }, [len, intervalMs])
  return [idx, setIdx] as const
}

export default function Hero() {
  const { t } = useI18n()

  const mainSlides  = [mango, basil, chilli]
  const side1Slides = [coco, eggs, basil]
  const side2Slides = [eggs, chilli, mango]

  const [mIdx,  setMIdx]  = useAutoplay(mainSlides.length, 4600)
  const [s1Idx, setS1Idx] = useAutoplay(side1Slides.length, 5600)
  const [s2Idx, setS2Idx] = useAutoplay(side2Slides.length, 6400)

  const Dots = ({ n, active, onGo }:{ n:number; active:number; onGo:(i:number)=>void }) => (
    <div className="absolute bottom-2 right-3 flex gap-1.5">
      {Array.from({length:n}).map((_,i)=>(
        <button
          key={i}
          aria-label={`Slide ${i+1}`}
          onClick={()=>onGo(i)}
          className={`w-2.5 h-2.5 rounded-full transition ${
            i===active ? 'bg-white shadow-ring' : 'bg-white/60 hover:bg-white/80'
          }`}
        />
      ))}
    </div>
  )

  return (
    <section id="home" className="relative section pt-6 md:pt-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(31,122,76,0.12),transparent),radial-gradient(50%_50%_at_80%_20%,rgba(196,154,35,0.08),transparent)]" />

      <Container>
        {/* === BANNERS Shopee-like === */}
        <div className="grid gap-4 md:gap-5 lg:gap-6 grid-cols-1 lg:grid-cols-3 items-stretch">
          {/* MAIN: mantiene exactamente alturas anteriores */}
          <div className="rounded-2xl border border-border bg-surface shadow-sm lg:col-span-2 relative"
               data-aos="fade-up" data-aos-duration="600">
            {/* Wrapper con altura FIJA como antes */}
            <div className="relative h-56 sm:h-64 md:h-72 lg:h-80">
              {mainSlides.map((src, i)=>(
                <img
                  key={i}
                  src={src}
                  alt={t('hero.banner_main_alt','Productos frescos de Krabi')}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i===mIdx?'opacity-100':'opacity-0'}`}
                  loading={i===0?'eager':'lazy'}
                  decoding="async"
                />
              ))}
              {/* Overlay copy */}
              <div className="absolute inset-0 bg-black/25 md:bg-black/20" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-5 sm:px-8">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.05] drop-shadow">
                    {t('hero.title')}
                  </h1>
                  <p className="mt-2 sm:mt-3 text-white/90 max-w-xl text-sm sm:text-base md:text-lg drop-shadow">
                    {t('hero.subtitle')}
                  </p>
                  <div className="mt-4 flex items-center gap-2 pointer-events-auto">
                    <a href="#products" className="btn">{t('hero.primary')}</a>
                    <a href="#cta" className="btn btn--gold">{t('hero.secondary')}</a>
                  </div>
                </div>
              </div>
              <Dots n={mainSlides.length} active={mIdx} onGo={setMIdx}/>
            </div>
          </div>

          {/* SIDE PROMOS: mismas alturas de antes */}
          <div className="flex flex-col gap-4 md:gap-5" data-aos="fade-up" data-aos-duration="700">
            <div className="rounded-2xl border border-border bg-surface shadow-sm relative">
              <div className="relative h-28 sm:h-32 md:h-36">
                {side1Slides.map((src,i)=>(
                  <img key={i} src={src} alt="Promo 1"
                       className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i===s1Idx?'opacity-100':'opacity-0'}`} />
                ))}
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-2 left-2">
                  <span className="badge badge--verified">100% Krabi</span>
                </div>
                <Dots n={side1Slides.length} active={s1Idx} onGo={setS1Idx}/>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface shadow-sm relative">
              <div className="relative h-28 sm:h-32 md:h-36">
                {side2Slides.map((src,i)=>(
                  <img key={i} src={src} alt="Promo 2"
                       className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i===s2Idx?'opacity-100':'opacity-0'}`} />
                ))}
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-2 left-2">
                  <span className="badge bg-accent-50 border-accent text-text">PromptPay</span>
                </div>
                <Dots n={side2Slides.length} active={s2Idx} onGo={setS2Idx}/>
              </div>
            </div>
          </div>
        </div>

        {/* ICONOS features */}
        <div className="mt-5 md:mt-6" data-aos="fade-up" data-aos-duration="600">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {[
              { t:'features.qr',     label: 'QR PromptPay',  icon: '💳' },
              { t:'features.trace',  label: 'Traceability',   icon: '🔗' },
              { t:'features.fresh',  label: 'Fresh & Local',  icon: '🥬' },
              { t:'features.fair',   label: 'Fair Price',     icon: '⚖️' },
              { t:'features.b2b',    label: 'B2B Hotels',     icon: '🏨' },
              { t:'features.support',label:'Farmer Support',  icon: '🤝' },
            ].map((f)=>(
              <div key={f.t} className="flex flex-col items-center text-center rounded-xl border border-border bg-surface py-3 shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl bg-primary-50">
                  {f.icon}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-semibold">{t(f.t as any, f.label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BANNER FIJO inferior */}
        <div className="mt-5 md:mt-6" data-aos="fade-up" data-aos-duration="600">
          <a href="#cta" className="group block relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,106,0,0.10)] via-[rgba(255,166,0,0.10)] to-transparent" />
            <div className="px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-base sm:text-lg font-extrabold">KrabiFarm — 100% Krabi</div>
                <div className="text-sm text-muted">{t('hero.promo', 'Compra directo a agricultores con pago QR y trazabilidad')}</div>
              </div>
              <span className="btn">{t('hero.cta_shop','Comprar ahora')}</span>
            </div>
          </a>
        </div>
      </Container>
    </section>
  )
}
