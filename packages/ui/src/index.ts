export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function formatDisplayDate(
  input: string | number | Date,
  locale: 'en' | 'am' = 'en',
): string {
  const date = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input
  if (Number.isNaN(date.getTime())) return String(input)
  if (locale === 'am') {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export {
  LanguageProvider,
  useLanguage,
  type Lang,
  type Translations,
} from './lib/LanguageContext'
export {
  AccessibilityProvider,
  useAccessibility,
} from './lib/AccessibilityContext'
export {
  default as Header,
  type HeaderProps,
  type HeaderNavLink,
} from './components/Header'
export {
  default as Footer,
  type FooterProps,
  type FooterContact,
  type FooterSocialLink,
} from './components/Footer'
export { LangSwitcher } from './components/LangSwitcher'
export { AccessibilityToolbar } from './components/AccessibilityToolbar'