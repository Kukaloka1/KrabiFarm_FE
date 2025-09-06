import { useContext } from 'react'
import { I18nCtx } from './ctx'

export function useI18n() {
  return useContext(I18nCtx)
}
