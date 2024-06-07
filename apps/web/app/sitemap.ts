import { MetadataRoute } from "next"
import { env } from "@/env.mjs"

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${env.NEXT_PUBLIC_BASE_URL}${env.NEXT_PUBLIC_BASE_PATH}`

// This allows us to generate a `sitemap.xml` file dynamically based on the needs of the Kenia Website
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const paths: Array<string> = []

  const publicRoutes = [
    "/"
    // Add more public routes here
  ]

  for (const route of publicRoutes) {
    paths.push(`${baseUrlAndPath}${route}`)
  }

  const currentDate = new Date().toISOString()

  return paths.map((route) => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: "always"
  }))
}

export default sitemap

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error"
