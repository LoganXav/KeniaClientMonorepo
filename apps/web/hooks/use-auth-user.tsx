import { create } from "zustand";

interface AuthUserClientStore {
  authUserClient: Record<string, any>;
  setAuthUserClient: (authUserClient: Record<string, any>) => void;
  deleteAuthUserClient: () => void;
}

export const useAuthUserClient = create<AuthUserClientStore>((set) => ({
  authUserClient: {},
  setAuthUserClient: (authUserClient) => set(() => ({ authUserClient })),
  deleteAuthUserClient: () => set(() => ({ authUserClient: {} })),
}));
