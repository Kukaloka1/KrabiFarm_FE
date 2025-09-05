import Container from '@/components/Container'
import { useI18n } from '@/lib/i18n'

export default function WhyUs(){
  const { t } = useI18n()
  const items = t('why.list') as string[] | any
  return (
    <section id="why" className="section">
      <Container>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t('why.title')}</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {Array.isArray(items) ? items.map((s,i)=>(
            <li key={i} className="card p-5">{s}</li>
          )) : null}
        </ul>
      </Container>
    </section>
  )
}
