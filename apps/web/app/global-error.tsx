import { Button } from "@repo/ui"

export default function GlobalErrorPage() {
  return (
    <html>
      <body>
        <main>
          5OO
          <h1>Internal Server Error</h1>
          <p className="-mt-4 max-w-sm text-center text-lg">
            This page has thrown a non-recoverable error.
          </p>
          <Button>Back to Home</Button>
        </main>
      </body>
    </html>
  )
}
