import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'
import logo from '@/assets/logo.png'

export default function Hero(){
  const { t } = useI18n()
  return (
    <section id="home" className="relative section pt-10 md:pt-14">
      {/* Fondo sutil con verdes/oro (sin afectar performance) */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(31,122,76,0.15),transparent),radial-gradient(50%_50%_at_80%_20%,rgba(196,154,35,0.10),transparent)]" />

      <Container>
        <div className="grid gap-8 md:gap-10 md:grid-cols-12 items-center">
          {/* Logo protagonista */}
          <div className="md:col-span-5">
            <div className="card p-6 md:p-8 bg-surface/80 backdrop-blur border border-border rounded-2xl flex items-center justify-center aspect-[4/3] md:aspect-square"
                 data-aos="zoom-in" data-aos-duration="500">
              <img
                src={logo}
                alt="KrabiFarm logo"
                className="h-28 sm:h-36 md:h-48 lg:h-80 w-auto drop-shadow"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Chips de confianza bajo el logo (solo elementos, AOS OK) */}
            <div className="mt-4 flex flex-wrap gap-2" data-aos="fade-up" data-aos-duration="500">
              <span className="badge badge--verified">100% Krabi</span>
              <span className="badge bg-primary-50 border-primary text-text">QR Traceability</span>
              <span className="badge bg-accent-50 border-accent text-text">PromptPay</span>
            </div>
          </div>

          {/* Texto + CTAs */}
          <div className="text-center md:text-left md:col-span-7">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]" data-aos="fade-up" data-aos-duration="500">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-lg text-muted max-w-2xl" data-aos="fade-up" data-aos-duration="600">
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-3" data-aos="fade-up" data-aos-duration="700">
              <a href="#products" className="btn">{t('hero.primary')}</a>
              <a href="#cta" className="btn btn--gold">{t('hero.secondary')}</a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
