import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.find({
      collection: 'users',
      limit: 1,
      depth: 0,
    })
    return Response.json(
      {
        status: 'ok',
        service: 'cms',
        database: 'connected',
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return Response.json(
      {
        status: 'error',
        service: 'cms',
        database: 'unreachable',
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}