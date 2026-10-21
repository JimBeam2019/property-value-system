import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Get price by year built
 *
 * @export
 * @param {Request} req
 * @return {*}
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const url = new URL(
    `${process.env.MARKET_ANALYSES_SERVICE_URL}/price-by-bedrooms`
  )
  url.search = searchParams.toString()

  const res = await fetch(url, { method: 'GET', cache: 'no-store' })

  if (!res.ok) {
    const errBody = await res.text()

    return NextResponse.json({ error: errBody }, { status: res.status })
  }

  const data = await res.json()

  return NextResponse.json(data)
}
