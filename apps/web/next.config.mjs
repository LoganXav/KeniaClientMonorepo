import { withSentryConfig } from "@sentry/nextjs";

import { SENTRY_DSN, SENTRY_TUNNEL } from "./sentry.constants.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],

  experimental: {
    // Enables Next.js's Instrumentation Hook
    instrumentationHook: true,
  },
};

/** @type {import('@sentry/nextjs/types/config/types').UserSentryOptions} */
const sentryConfig = {
  // Upload Next.js or third-party code in addition to our code
  widenClientFileUpload: true,
  // Attempt to circumvent ad blockers
  tunnelRoute: SENTRY_TUNNEL(),
  // Prevent source map comments in built files
  hideSourceMaps: false,
  // Tree shake Sentry stuff from the bundle
  disableLogger: true,
  // Applies same WebPack Transpilation as Next.js
  transpileClientSDK: true,
};

/** @type {import('@sentry/cli').SentryCliOptions} */
const sentrySettings = {
  // We don't want Sentry to emit logs
  silent: true,
  // Define the Sentry Organisation
  org: "Kenia",
  // Define the Sentry Project on our Sentry Organisation
  project: "kenia-client",
  // Sentry DSN for the Kenia Website
  dsn: SENTRY_DSN,
};

// Next.js Configuration with Sentry enabled
const nextConfigWithSentry = withSentryConfig(nextConfig, sentryConfig, sentrySettings);

export default withSentryConfig(nextConfigWithSentry, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "kenia-vy",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
