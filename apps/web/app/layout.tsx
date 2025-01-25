import "@repo/ui/styles/global.css";
import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@repo/ui";
import { Toaster } from "@repo/ui";
import { baseMetadata, baseViewport } from "@/constants/metadata";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import BaseLayout from "@/layouts/base";
import QueryClientContextProvider from "@/providers/query-client-provider";
import { getAuthUserServer } from "../helpers/auth-user";

// Define the font styles
// export const fontSans = Inter({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   weight: "400",
// });

export const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const fontSans = localFont({
  src: "../assets/fonts/PlusJakartaSans-Regular.ttf",
  variable: "--font-sans",
});

/**
 * Define the metadata for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const metadata: Metadata = baseMetadata;

/**
 * Define the viewport for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = baseViewport;

/**
 * Define the root layout for the site
 * Only the root layout can contain <html> and <body> tags.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts
 */
export default function RootLayout({ public: publicPages, protected: protectedPages, children }: { children: React.ReactNode; public: React.ReactNode; protected: React.ReactNode }): JSX.Element {
  const authUser = getAuthUserServer();

  return (
    <html lang="en" className={cn(fontSans.variable, fontHeading.variable)} suppressHydrationWarning>
      <body>
        <QueryClientContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // forcedTheme="light"
          >
            <BaseLayout>
              {children}
              {authUser ? protectedPages : publicPages}
            </BaseLayout>
            <Toaster expand={true} visibleToasts={2} position="top-right" pauseWhenPageIsHidden />
            <TailwindIndicator />
          </ThemeProvider>
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
