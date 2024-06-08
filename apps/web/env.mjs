import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    IS_DEVELOPMENT: z.string().min(1),
    NEXT_PUBLIC_BASE_PATH: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    },
    client: {
      NEXT_PUBLIC_APP_URL: z.string().min(1),
      IS_DEVELOPMENT: z.string().min(1),
    NEXT_PUBLIC_BASE_PATH: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    IS_DEVELOPMENT: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL

  },
})
