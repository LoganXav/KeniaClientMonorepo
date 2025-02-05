// import { init } from "@sentry/nextjs"

// import {
//   SENTRY_CAPTURE_RATE,
//   SENTRY_DSN,
//   SENTRY_TUNNEL
// } from "@/sentry.constants.mjs"

// export function register() {
//   if (process.env.NEXT_RUNTIME === "nodejs") {
//     init({
//       tunnel: SENTRY_TUNNEL(),
//       // Provide Sentry's Secret Key
//       dsn: SENTRY_DSN,
//       // Percentage of events to send to Sentry (1% of them) (for performance metrics)
//       tracesSampleRate: SENTRY_CAPTURE_RATE
//     })
//   }
// }

import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
