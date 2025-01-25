"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUserStore {
  authUserIds: {
    tenantId: number;
    id: number;
  } | null;
  setAuthUserIds: (ids: { tenantId: number; id: number }) => void;
  deleteAuthUserIds: () => void;
}

export const useAuthUser = create<AuthUserStore>()(
  persist(
    (set) => ({
      authUserIds: null,
      setAuthUserIds: (authUserIds) => set(() => ({ authUserIds })),
      deleteAuthUserIds: () => set(() => ({ authUserIds: null })),
    }),
    {
      name: "authUser",
      getStorage: () => localStorage,
    }
  )
);
