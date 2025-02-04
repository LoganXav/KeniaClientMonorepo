import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui";
import Link from "next/link";
import React from "react";

type Props = { pages: { title: string; path: string }[] };

export function PageBreadcrumbs({ pages }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center space-x-0">
        {pages
          .slice(0, pages.length - 1)
          .map((page: { title: string; path: string }, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href={page.path} className="underline">
                    {page.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{pages[pages.length - 1].title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
