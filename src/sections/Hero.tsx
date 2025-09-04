import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'

export default function Hero(){
  const { t } = useI18n()
  return (
    <section id="home" className="relative section pt-10 md:pt-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(37,99,235,0.15),transparent),radial-gradient(50%_50%_at_80%_20%,rgba(0,199,177,0.10),transparent)]" />
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">{t('hero.title')}</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{t('hero.subtitle')}</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#products" className="btn">{t('hero.primary')}</a>
            <a href="#cta" className="btn" style={{backgroundColor:'var(--color-accent)'} as any}>{t('hero.secondary')}</a>
          </div>
        </div>
      </Container>
    </section>
  )
}
