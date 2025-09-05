import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'

export default function ProblemSolution(){
  const { t } = useI18n()
  return (
    <section id="problem" className="section">
      <Container>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t('problem.title')}</h2>
        <p className="text-muted max-w-3xl">{t('problem.body')}</p>
      </Container>
    </section>
  )
}
