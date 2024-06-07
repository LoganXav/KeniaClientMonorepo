"use client";

import { ReactNode } from "react";

// TODO - Implement a session provider to bounce back if user is authenticated.
export default function Providers({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
