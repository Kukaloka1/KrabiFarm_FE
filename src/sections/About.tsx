//About//
import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'
export default function About(){
  const { t } = useI18n()
  return (
    <section id="about" className="section">
      <Container>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t('about.title')}</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl">{t('about.body')}</p>
      </Container>
    </section>
  )
}
