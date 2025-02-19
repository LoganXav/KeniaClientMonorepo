"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Typography } from "@repo/ui";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = { pages: { title: string; path?: string }[] };

export function PageBreadcrumbs({ pages }: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <Button variant={"outline"} className="border-border bg-card" onClick={() => router.back()}>
        <ChevronLeft strokeWidth={1} />
      </Button>
      <div>
        <Typography size={"h3"} className="font-heading">
          {pages[pages.length - 1]?.title}
        </Typography>
        <Breadcrumb>
          <BreadcrumbList className="flex items-center space-x-0">
            {pages.slice(0, pages.length - 1).map((page: { title: string; path?: string }, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <BreadcrumbItem>
                  <BreadcrumbLink href={page.path || ""} className="underline">
                    {page.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </div>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{pages[pages.length - 1]?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
