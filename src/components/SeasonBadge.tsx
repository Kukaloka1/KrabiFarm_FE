import { useI18n } from '@/lib/i18n'

export default function SeasonBadge({ status }:{ status:'in_season'|'out_of_season'|'limited'|undefined }){
  const { t } = useI18n()
  if(!status) return null
  const map = {
    in_season: { txt: t('products.status.in'), cls: 'bg-[color-mix(in_oklab,var(--color-primary)25%,transparent)] text-text border border-primary' },
    out_of_season: { txt: t('products.status.out'), cls: 'bg-[color-mix(in_oklab,#999_25%,transparent)] text-text border border-border' },
    limited: { txt: t('products.status.limited'), cls: 'bg-[color-mix(in_oklab,var(--color-accent)25%,transparent)] text-text border border-accent' },
  } as const
  const v = map[status]
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${v.cls}`}>{v.txt}</span>
}
