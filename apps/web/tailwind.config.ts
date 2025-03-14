import { shadcnPreset } from "@repo/tailwind-config/lib/shadcn-preset";
import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./layouts/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}", "./content/**/*.{md,mdx}", "../../packages/ui/components/**/*.{ts,tsx}"],
  presets: [shadcnPreset],
} satisfies Config;

export default config;
