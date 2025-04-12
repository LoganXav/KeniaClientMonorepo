import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
// @ts-ignore
import animatePlugin from "tailwindcss-animate";

import { shadcnPlugin } from "./shadcn-plugin";

export const shadcnPreset = {
  content: ["./*.{ts,tsx}"],
  darkMode: ["class"],
  plugins: [animatePlugin, typographyPlugin, shadcnPlugin],
} satisfies Config;
