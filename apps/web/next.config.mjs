import { withSentryConfig } from '@sentry/nextjs';

import {
  SENTRY_DSN,
  SENTRY_TUNNEL,
} from './sentry.constants.mjs';


/** @type {import('next').NextConfig} */
 const nextConfig = {
   transpilePackages: ["@repo/ui"],
   
   experimental: {
    // Enables Next.js's Instrumentation Hook
    instrumentationHook: true,
   }
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
  org: 'Kenia',
  // Define the Sentry Project on our Sentry Organisation
  project: 'kenia-client',
  // Sentry DSN for the Kenia Website
  dsn: SENTRY_DSN,
};


// // Next.js Configuration with `sentry` enabled
// const nextWithSentry = withSentryConfig(
//   // Sentry SDK and WebPack Settings
//   { ...sentrySettings, ...sentryConfig }
// );


// Next.js Configuration with Sentry enabled
const nextConfigWithSentry = withSentryConfig(nextConfig, sentryConfig, sentrySettings);

export default nextConfigWithSentry
