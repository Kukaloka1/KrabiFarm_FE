import { useState } from 'react'
import { useInquiry } from '@/features/inquiry/InquiryContext'
import { CONTACT } from '@/data/site'

export default function ContactForm(){
  const { items } = useInquiry()
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const disabled = !name || !emailOk

  const lines = items.map(x => `- ${x.product.name} × ${x.qty} (${x.product.unit}) @ ฿${x.product.retailPrice}`)
  const total = items.reduce((n,x)=> n + x.qty * (x.product.retailPrice||0), 0)
  const body = [
    'Contact request',
    `Name: ${name}`,
    company ? `Company: ${company}` : '',
    `Email: ${email}`,
    '',
    message ? `Message:\n${message}\n` : '',
    items.length ? 'Inquiry items:' : '',
    ...lines,
    items.length ? `\nTotal (retail): ฿${total.toFixed(2)}` : '',
  ].filter(Boolean).join('\n')

  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Contact — KrabiFarm')}&body=${encodeURIComponent(body)}`
  const wa = `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(body)}`

  return (
    <form className="grid gap-3" onSubmit={(e)=>{ e.preventDefault(); window.location.href = mailto }}>
      <div className="grid md:grid-cols-2 gap-3">
        <input className="px-4 py-3 rounded-xl border border-border bg-surface" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input className="px-4 py-3 rounded-xl border border-border bg-surface" placeholder="Company (optional)" value={company} onChange={e=>setCompany(e.target.value)}/>
      </div>
      <input className="px-4 py-3 rounded-xl border border-border bg-surface" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      {!emailOk && email && <p className="text-sm text-red-600">Enter a valid email.</p>}
      <textarea className="px-4 py-3 rounded-xl border border-border bg-surface min-h-32" placeholder="Message (optional)" value={message} onChange={e=>setMessage(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <button className="btn" disabled={disabled} type="submit">Send Email</button>
        <a className={`btn btn--gold ${disabled ? 'pointer-events-none opacity-50' : ''}`} href={disabled ? undefined : wa} onClick={e=>{ if(disabled){ e.preventDefault() }}} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
      {!!items.length && <p className="text-sm text-muted">Items will be included in the message.</p>}
    </form>
  )
}
