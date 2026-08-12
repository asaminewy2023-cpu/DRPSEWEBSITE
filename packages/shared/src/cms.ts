export const CMS_BASE_URL =
  process.env.CMS_BASE_URL ??
  process.env.NEXT_PUBLIC_CMS_BASE_URL ??
  'http://localhost:3000'

export interface CmsListResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export async function cmsFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${CMS_BASE_URL}${path}`, {
    cache: 'no-store',
    ...init,
  })
  if (!res.ok) {
    throw new Error(`CMS request to ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function cmsList<T>(
  slug: string,
  params: Record<string, unknown> = {},
): Promise<T[]> {
  const res = await cmsFetch<CmsListResponse<T>>(
    `/api/${slug}${cmsQuery(params)}`,
  )
  return res.docs
}

export function cmsQuery(params: Record<string, unknown>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue
    if (typeof value === 'object') {
      search.set(key, JSON.stringify(value))
    } else {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}