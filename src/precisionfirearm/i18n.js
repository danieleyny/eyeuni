import { createContext, useContext } from 'react'

/* Language context + resolver — kept separate from ui.jsx so that file can
 * export only components (React Fast Refresh requirement). */

export const LangContext = createContext({ lang: 'en', setLang: () => {} })

export function useLang() {
  return useContext(LangContext)
}

/** Resolve a { en, es } pair (or plain string) against the active language. */
export function useT() {
  const { lang } = useLang()
  return (pair) => (typeof pair === 'string' ? pair : pair?.[lang] ?? pair?.en ?? '')
}
