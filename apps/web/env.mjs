import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NODE_ENV: z.string().min(1),
  },
  server: {
    NEXT_PUBLIC_APP_URL: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_AES_ENCRYPTION_KEY: z.string(),
    NEXT_PUBLIC_AES_ENCRYPTION_IV: z.string(),
    NEXT_PUBLIC_APP_URL: z.string().min(1).optional(),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_AES_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_AES_ENCRYPTION_KEY,
    NEXT_PUBLIC_AES_ENCRYPTION_IV: process.env.NEXT_PUBLIC_AES_ENCRYPTION_IV,
  },
});
