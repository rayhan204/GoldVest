import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,

    accessToken: null,

    refreshToken: null,

    setAuth: ({ user, accessToken, refreshToken }) =>
        set({
            user,
            accessToken,
            refreshToken,
        }),

    clearAuth: () =>
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
        }),
}));

export default useAuthStore;