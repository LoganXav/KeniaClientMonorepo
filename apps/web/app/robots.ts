import type { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/"
        // Add other protected routes here
      ]
    }
  ],
  // TODO: Rename to domain URL for indexing
  sitemap: "https://localhost:3000/sitemap.xml"
})

export default robots

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error"
