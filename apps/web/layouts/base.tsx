"use client"

import type { FC, PropsWithChildren } from "react"

import { NavigationStateProvider } from "@/providers/navigation-state-provider"

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  <NavigationStateProvider>
    <div>{children}</div>
  </NavigationStateProvider>
)

export default BaseLayout
