'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => console.log(error), [error])

  const handleRobustRecovery = () =>
    startTransition(() => {
      router.refresh()
      reset()
    })

  return (
    <div className="error-boundary">
      <h2>System Error! Please Try Again.</h2>
      <p style={{ color: 'red', marginBottom: '1rem' }}>
        Error: Something went wrong.
      </p>

      <button onClick={handleRobustRecovery} disabled={isPending}>
        {isPending ? 'Retrying...' : 'Try Again'}
      </button>
    </div>
  )
}
