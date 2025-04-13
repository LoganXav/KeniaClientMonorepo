import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  // 1. Add CSS variable definitions to the base layer
  function ({ addBase }) {
    addBase({
      ":root": {
        "--background": "0 10% 96.08%",
        "--foreground": "222.2 84% 4.9%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "190 0% 50%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 84% 4.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 84% 4.9%",
        "--border": "0 0% 90%",
        "--border-foreground": "0, 0%, 100%, 0.059",
        "--input": "214.3 31.8% 91.4%",
        "--primary": "222.2 47.4% 11.2%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.7rem",

        "--link": "213.12 93.9% 67.84%",
      },
      ".dark": {
        "--background": "0, 0%, 10.6%",
        "--foreground": "210 40% 98%",
        "--muted": "217.2 32.6% 17.5%",
        "--muted-foreground": "0, 0%, 81.2%",
        "--popover": "0, 0%, 15.7%",
        "--popover-foreground": "210 40% 98%",
        "--card": "0, 0%, 15.7%",
        "--card-foreground": "210 40% 98%",
        "--border": "0, 0%, 24.7%",
        "--border-foreground": "0, 0%, 100%, 0.059",
        "--input": "217.2 32.6% 17.5%",
        "--primary": "210 40% 98%",
        "--primary-foreground": "222.2 47.4% 11.2%",
        "--secondary": "217.2 32.6% 17.5%",
        "--secondary-foreground": "210 40% 98%",
        "--accent": "0, 0%, 24.7%",
        "--accent-foreground": "210 40% 98%",
        "--destructive": "0 70% 50%",
        "--destructive-foreground": "0 85.7% 97.3%",
        "--ring": "217.2 32.6% 17.5%",

        "--link": "213.12 93.9% 67.84%",
      },
    });

    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
      },
    });
  },

  // 2. Extend the Tailwind theme with "themable" utilities
  {
    theme: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1450px",
        },
      },
      extend: {
        colors: {
          link: "hsl(var(--link))",

          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
            foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          xl: `calc(var(--radius) + 4px)`,
          lg: `var(--radius)`,
          md: `calc(var(--radius) - 2px)`,
          sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
          "sans-medium": ["var(--font-sans-medium)", ...fontFamily.sans],
          "sans-semibold": ["var(--font-sans-semibold)", ...fontFamily.sans],
          heading: ["var(--font-heading)", ...fontFamily.sans],
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "caret-blink": {
            "0%,70%,100%": { opacity: "1" },
            "20%,50%": { opacity: "0" },
          },
          spin: {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "caret-blink": "caret-blink 1.25s ease-out infinite",
          spin: "spin 3s linear infinite",
        },
        aspectRatio: {
          poster: "3 / 4",
        },
      },
    },
  }
);
