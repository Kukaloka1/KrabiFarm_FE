import { useI18n } from '@/lib/i18n'
export default function Footer(){
  const { t } = useI18n()
  return (
    <footer className="py-10 border-t border-border">
      <div className="container-xl text-sm text-muted">© KrabiFarm. {t('footer.legal')}</div>
    </footer>
  )
}
