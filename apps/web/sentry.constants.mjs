import { BASE_URL, IS_DEVELOPMENT } from './next.constants.mjs';

/**
 * This is the Sentry DSN for the Node.js Website Project
 */
export const SENTRY_DSN =
  'https://e2efeee5f9524dc819200f131ecbe9ab@o4507392057737216.ingest.de.sentry.io/4507392088014928';

/**
 * This states if Sentry should be enabled and bundled within our App
 *
 * We enable sentry by default if we're in development mode.
 */
export const SENTRY_ENABLE = IS_DEVELOPMENT;

/**
 * This configures the sampling rate for Sentry
 *
 * We always want to capture 100% on Vercel Preview Branches
 * and not when it's on Production Mode (nodejs.org)
 */
export const SENTRY_CAPTURE_RATE =
  SENTRY_ENABLE && BASE_URL !== 'https://kenia.org' ? 1.0 : 0.01;

/**
 * Provides the Route for Sentry's Server-Side Tunnel
 *
 * This is a `@sentry/nextjs` specific feature
 */
export const SENTRY_TUNNEL = (components = '') => `/api/monitoring${components}`;

/**
 * This configures which Sentry features to tree-shake/remove from the Sentry bundle
 * These options help reduce the bundle size by removing unnecessary features.
 * 
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
 */
export const SENTRY_EXTENSIONS = {
  __SENTRY_DEBUG__: false,
  __SENTRY_TRACING__: false,
  __RRWEB_EXCLUDE_IFRAME__: true,
  __RRWEB_EXCLUDE_SHADOW_DOM__: true,
  __SENTRY_EXCLUDE_REPLAY_WORKER__: true,
};
