// src/components/PromoBanner.tsx
type Props = {
    title: string
    subtitle?: string
    ctaLabel?: string
    onCtaClick?: () => void
  }
  
  export default function PromoBanner({ title, subtitle, ctaLabel, onCtaClick }: Props){
    return (
      <div className="relative rounded-2xl overflow-hidden border border-emerald-300/40">
        {/* Fondo: gradiente animado + patrón */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-[shift_12s_linear_infinite] bg-[length:200%_200%] bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 opacity-90" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,white_1px,transparent_1px),radial-gradient(circle_at_80%_70%,white_1px,transparent_1px)] bg-[length:24px_24px]" />
        </div>
  
        <div className="relative z-10 p-4 md:p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-extrabold text-lg md:text-xl">{title}</h3>
            {subtitle && <p className="text-emerald-50/90 text-sm md:text-base mt-1">{subtitle}</p>}
          </div>
  
          {ctaLabel && (
            <button
              onClick={onCtaClick}
              className="shrink-0 rounded-xl bg-white text-emerald-700 font-semibold px-4 py-2 md:px-5 md:py-2.5 shadow hover:shadow-md hover:bg-emerald-50 transition"
            >
              {ctaLabel}
            </button>
          )}
        </div>
  
        {/* keyframes locales */}
        <style>{`
          @keyframes shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    )
  }
  