import "@repo/ui/styles/global.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { cn } from "@repo/ui"
import { baseMetadata } from "@/constants/metadata"

// Define the font styles
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "400"
})

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading"
})

/**
 * Define the metadata for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const metadata: Metadata = baseMetadata

/**
 * Define the viewport for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = baseViewport

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen scroll-smooth bg-background font-heading antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
