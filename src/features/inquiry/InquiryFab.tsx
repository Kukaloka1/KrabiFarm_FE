import { useInquiry } from './InquiryContext'

export default function InquiryFab({ onOpen }:{ onOpen:()=>void }){
  const { count } = useInquiry()
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-5 right-5 z-50 btn shadow-[0_10px_30px_-10px_rgba(0,0,0,.35)]"
      aria-label="Open inquiry"
    >
      Inquiry
      <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 text-xs font-bold rounded-full bg-accent text-black px-2">
        {count}
      </span>
    </button>
  )
}
