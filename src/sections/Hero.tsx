// src/sections/Hero.tsx
import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'
import logo from '@/assets/logo.png'

export default function Hero() {
  const { t } = useI18n()

  const extraText =
    (t('hero.extra') as string) ||
    'Connecting Krabi’s farmers directly with global markets through technology, traceability and fair trade.'

  return (
    <section id="home" className="relative section pt-10 md:pt-14">
      {/* Fondo sutil con verdes/oro */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(31,122,76,0.15),transparent),radial-gradient(50%_50%_at_80%_20%,rgba(196,154,35,0.10),transparent)]" />

      <Container>
        <div className="grid gap-10 md:grid-cols-12 items-center">
          {/* Logo protagonista sin card de fondo */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="KrabiFarm logo"
              className="h-48 sm:h-64 md:h-80 lg:h-[22rem] xl:h-[26rem] w-auto drop-shadow-2xl"
              loading="eager"
              decoding="async"
              data-aos="zoom-in"
              data-aos-duration="600"
            />

            {/* Chips de confianza */}
            <div
              className="mt-6 flex flex-wrap gap-2"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              <span className="badge badge--verified">100% Krabi</span>
              <span className="badge bg-primary-50 border-primary text-text">
                QR Traceability
              </span>
              <span className="badge bg-accent-50 border-accent text-text">
                PromptPay
              </span>
            </div>
          </div>

          {/* Texto + CTAs */}
          <div className="text-center md:text-left md:col-span-7">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05]"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              {t('hero.title')}
            </h1>

            <p
              className="mt-4 text-lg text-muted max-w-2xl mx-auto md:mx-0"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              {t('hero.subtitle')}
            </p>

            {/* Texto extra de venta */}
            <p
              className="mt-3 text-base md:text-lg text-muted max-w-2xl mx-auto md:mx-0"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              {extraText}
            </p>

            {/* CTA */}
            <div
              className="mt-8 flex items-center justify-center md:justify-start gap-3"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <a href="#products" className="btn">
                {t('hero.primary')}
              </a>
              <a href="#cta" className="btn btn--gold">
                {t('hero.secondary')}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
