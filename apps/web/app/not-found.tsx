import { Button } from "@repo/ui"
import { captureException } from "@sentry/nextjs"

export default function NotFoundPage({ error }: { error: Error }) {
  captureException(error)

  return (
    <main>
      404
      <h1>Internal Server Error</h1>
      <p className="mt-4 max-w-sm text-center text-lg">
        This page has thrown a 404 error.
      </p>
      <Button>Back to Home</Button>
    </main>
  )
}
