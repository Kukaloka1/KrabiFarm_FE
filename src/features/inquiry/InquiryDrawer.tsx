import { useInquiry } from './InquiryContext'
import { CONTACT } from '@/data/site'

function buildMessage(items: ReturnType<typeof useInquiry>['items']){
  const lines = items.map(x => `- ${x.product.name} × ${x.qty} (${x.product.unit}) @ ฿${x.product.retailPrice}`)
  const total = items.reduce((n,x)=> n + x.qty * (x.product.retailPrice||0), 0)
  return [
    'KrabiFarm — Inquiry',
    '',
    ...lines,
    '',
    `Total (retail): ฿${total.toFixed(2)}`,
    '',
    'Please confirm availability, delivery window and B2B tiers if applicable.'
  ].join('\n')
}

export default function InquiryDrawer({ open, onClose }:{ open:boolean; onClose:()=>void }){
  const { items, remove, clear } = useInquiry()
  if(!open) return null

  const total = items.reduce((n,x)=> n + x.qty * (x.product.retailPrice||0), 0)
  const body = buildMessage(items)
  const subject = 'Inquiry — KrabiFarm'
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const wa = `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(body)}`

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close overlay"/>
      <aside className="absolute right-0 top-0 h-full w-[92%] sm:w-[28rem] card p-4 overflow-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Inquiry</h3>
          <button className="px-2 py-1 rounded-md border border-border" onClick={onClose}>✕</button>
        </div>

        <ul className="mt-4 space-y-3">
          {items.map(it=>(
            <li key={it.product.id} className="flex items-center gap-3">
              <img src={it.product.image} alt="" className="w-14 h-14 rounded-lg object-cover"/>
              <div className="flex-1">
                <div className="font-semibold">{it.product.name}</div>
                <div className="text-sm text-muted">× {it.qty} · ฿{it.product.retailPrice} / {it.product.unit}</div>
              </div>
              <button className="px-2 py-1 rounded-md border border-border" onClick={()=>remove(it.product.id)}>Remove</button>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-border pt-3 flex items-center justify-between">
          <div className="text-sm text-muted">Total</div>
          <div className="font-semibold">฿{total.toFixed(2)}</div>
        </div>

        <div className="mt-4 flex gap-2">
          <a className="btn flex-1" href={mailto}>Send Email</a>
          <a className="btn btn--gold flex-1" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>

        <button className="mt-3 text-sm underline" onClick={clear}>Clear</button>
      </aside>
    </div>
  )
}
