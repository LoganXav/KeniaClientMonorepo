"use client";
import type { FC, PropsWithChildren } from "react";
import { NavigationStateProvider } from "@/providers/navigation-state-provider";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => (
  // <NavigationStateProvider>
  <div className="min-h-screen scroll-smooth font-sans antialiased bg-background">
    {children}
  </div>
  // </NavigationStateProvider>
);

export default BaseLayout;
