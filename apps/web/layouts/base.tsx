"use client"

import type { FC, PropsWithChildren } from "react"

import { NavigationStateProvider } from "@/providers/navigation-state-provider"
import { cn } from "@repo/ui"

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <NavigationStateProvider>
    <div
      className={cn(
        "min-h-screen scroll-smooth bg-background font-sans antialiased"
      )}
    >
      {children}
    </div>
  </NavigationStateProvider>
)

export default BaseLayout
