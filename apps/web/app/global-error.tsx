"use client"

import BaseLayout from "@/layouts/base"
import CenteredLayout from "@/layouts/centered"
import { Button } from "@repo/ui"
import { captureException } from "@sentry/nextjs"

export default function GlobalErrorPage({ error }: { error: Error }) {
  captureException(error)

  return (
    <html>
      <body>
        <BaseLayout>
          <CenteredLayout>
            <main>
              5OO
              <h1>Internal Server Error</h1>
              <p className="mt-4 max-w-sm text-center text-lg">
                This page has thrown a non-recoverable error.
              </p>
              <Button>Back to Home</Button>
            </main>
          </CenteredLayout>
        </BaseLayout>
      </body>
    </html>
  )
}
