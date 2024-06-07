"use client"
import type { FC, PropsWithChildren } from "react"
import { NavigationStateProvider } from "@/providers/navigation-state-provider"

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  // <NavigationStateProvider>
  <div className="min-h-screen scroll-smooth bg-background font-sans antialiased">
    {children}
  </div>
  // </NavigationStateProvider>
)

export default BaseLayout
