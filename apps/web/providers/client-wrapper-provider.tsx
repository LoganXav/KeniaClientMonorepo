"use client";

import { useEffect, useState } from "react";

export default function ClientWrapperProvider({ children }: React.PropsWithChildren) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Prevents mismatches between SSR and Client-side
  if (!hydrated) return null;

  return <>{children}</>;
}
