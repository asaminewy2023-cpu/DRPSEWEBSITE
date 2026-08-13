import type { CollectionAfterChangeHook } from 'payload'

const WEBSITE_BASE_URL = process.env.WEBSITE_BASE_URL
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

/**
 * After any CMS collection change, ping the website's on-demand revalidation
 * endpoint so ISR caches (tagged `cms`) refresh. Fire-and-forget; never block
 * the CMS write. No-op when WEBSITE_BASE_URL or REVALIDATE_SECRET is unset.
 */
export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create' && operation !== 'update') return doc
  if (!WEBSITE_BASE_URL || !REVALIDATE_SECRET) return doc

  try {
    const url = new URL('/api/revalidate', WEBSITE_BASE_URL)
    url.searchParams.set('secret', REVALIDATE_SECRET)
    url.searchParams.set('tag', 'cms')
    void fetch(url.toString(), {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    }).catch(() => {
      req.payload.logger.warn(`Revalidation ping to ${WEBSITE_BASE_URL} failed.`)
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    req.payload.logger.error(`Revalidation hook error: ${message}`)
  }

  return doc
}
