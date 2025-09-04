import Container from '@/components/Container'
import { CONTACT } from '@/data/site'
import PromptPay from '@/components/PromptPay'

export default function CTA(){
  const msg = encodeURIComponent('Hello! I would like to place an order / request a quote.')
  const wa = `https://wa.me/${CONTACT.whatsappIntl}?text=${msg}`
  return (
    <section id="cta" className="section">
      <Container>
        <div className="card p-8 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to order?</h2>
          <p className="text-muted mt-2">Message us on WhatsApp or pay via PromptPay. For B2B, ask about delivery schedules and tiers.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a className="btn" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="btn btn--outline" href={`mailto:${CONTACT.email}`}>Email</a>
            <PromptPay />
          </div>
          <p className="text-sm text-muted mt-3">WhatsApp: {CONTACT.whatsappDisplay}</p>
        </div>
      </Container>
    </section>
  )
}
