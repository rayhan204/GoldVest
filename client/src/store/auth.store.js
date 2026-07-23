import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setAuth: ({ user, accessToken, refreshToken }) =>
        set((state) => ({
          user: user ?? state.user,
          accessToken: accessToken ?? state.accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
        })),

      setUser: (user) => set({ user }),

      setAccessToken: (accessToken) => set({ accessToken }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "goldvest-auth",
    }
  )
);

export default useAuthStore;
