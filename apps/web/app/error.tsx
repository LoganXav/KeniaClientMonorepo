"use client"

import { Button } from "@repo/ui"
import { captureException } from "@sentry/nextjs"

export default function ErrorPage({ error }: { error: Error }) {
  captureException(error)

  return (
    <main>
      5OO
      <h1>Internal Server Error</h1>
      <p className="-mt-4 max-w-sm text-center text-lg">
        This page has thrown a 500 error.
      </p>
      <Button>Back to Home</Button>
    </main>
  )
}
