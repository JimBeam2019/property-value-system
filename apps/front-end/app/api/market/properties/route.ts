import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Get properties for Market Analysis
 *
 * @export
 * @return {*}
 */
export async function GET() {
  const url = new URL(`${process.env.MARKET_ANALYSES_SERVICE_URL}/properties`)

  const res = await fetch(url, { method: 'GET', cache: 'no-store' })

  if (!res.ok) {
    const errBody = await res.text()

    return NextResponse.json({ error: errBody }, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
