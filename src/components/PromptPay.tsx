import { useState } from 'react'
import Modal from '@/components/Modal'
import { CONTACT } from '@/data/site'

export default function PromptPay(){
  const [open,setOpen] = useState(false)
  function copyId(){
    navigator.clipboard?.writeText(CONTACT.promptpayId)
  }
  return (
    <>
      <button className="btn btn--gold" onClick={()=>setOpen(true)}>PromptPay</button>
      <Modal open={open} onClose={()=>setOpen(false)} title="PromptPay">
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-2">
            <strong>ID:</strong> <code>{CONTACT.promptpayId}</code>
            <button className="px-3 py-1 rounded-lg border border-border hover:border-primary" onClick={copyId}>Copy</button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border bg-surface p-3">
            <img src="/payments/promptpay-placeholder.svg" alt="PromptPay QR" className="mx-auto w-60 h-60 object-contain" />
          </div>
          <p className="text-muted">Scan this QR with your banking app. Replace the placeholder with your real PromptPay QR later.</p>
        </div>
      </Modal>
    </>
  )
}
