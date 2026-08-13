import type { GlobalConfig } from 'payload'

import { Settings } from './Settings'
import { SiteSettings } from './SiteSettings'

export const globals: GlobalConfig[] = [Settings, SiteSettings]

export { Settings } from './Settings'
export { SiteSettings } from './SiteSettings'