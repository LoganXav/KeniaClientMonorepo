"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUserClientStore {
  authUserClient: Record<string, any>;
  setAuthUserClient: (authUserClient: Record<string, any>) => void;
  deleteAuthUserClient: () => void;
}

export const useAuthUserClient = create<AuthUserClientStore>()(
  persist(
    (set) => ({
      authUserClient: {},
      setAuthUserClient: (authUserClient) => set(() => ({ authUserClient })),
      deleteAuthUserClient: () => set(() => ({ authUserClient: {} })),
    }),
    {
      name: "authUserClient",
      getStorage: () => localStorage,
    }
  )
);
