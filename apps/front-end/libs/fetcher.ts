/**
 * Fetcher
 * @param args
 * @returns
 */
export const fetcher = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  const res = await fetch(...args)

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

/**
 * Fetcher with Parameters
 * @param param0
 * @returns
 */
export const fetcherWithParams = async <T>([url, params]: [
  string,
  Record<string, string | number | undefined>,
]): Promise<T> => {
  const query = new URLSearchParams()

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, String(value))
  })

  const finalUrl = query.toString() ? `${url}?${query.toString()}` : url

  console.log('finalUrl', finalUrl)

  const res = await fetch(finalUrl)

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
