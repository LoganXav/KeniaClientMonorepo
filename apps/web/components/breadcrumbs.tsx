"use client";

import React, { useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Typography } from "@repo/ui";

type Page = { title: string; path?: string };
type Props = {
  pages: Page[];
  fallbackPath?: string;
};

export function PageBreadcrumbs({ pages, fallbackPath = "/" }: Props) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    // Check for SPA history index
    if (typeof window !== "undefined" && window.history.state && typeof window.history.state.idx === "number" && window.history.state.idx > 0) {
      router.back();
    } else {
      // No meaningful history: fall back to previous breadcrumb path if available
      const prevPage = pages.length > 1 ? pages[pages.length - 2] : null;
      if (prevPage?.path) {
        // Use replace so we don't add an extra history entry
        router.replace(prevPage.path);
      } else {
        router.replace(fallbackPath);
      }
    }
  }, [router, pages, fallbackPath]);

  const currentPage = pages[pages.length - 1];

  return (
    <div className="flex items-center gap-4">
      <Button variant={"outline"} className="border-border bg-card" onClick={handleBack}>
        <ChevronLeft strokeWidth={1} />
      </Button>
      <div>
        <Typography size={"h3"} className="font-heading">
          {currentPage?.title}
        </Typography>
        <Breadcrumb>
          <BreadcrumbList className="flex items-center space-x-0">
            {pages.slice(0, pages.length - 1).map((page, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <BreadcrumbItem>
                  {page.path ? (
                    <BreadcrumbLink href={page.path} className="underline">
                      {page.title}
                    </BreadcrumbLink>
                  ) : (
                    <span>{page.title}</span>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
