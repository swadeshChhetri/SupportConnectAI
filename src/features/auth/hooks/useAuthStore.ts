import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchMe, type User, type Org } from "../api/authApi";

type AuthState = {
  isAuthenticated: boolean;
  isBootstrapping: boolean;

  user: User | null;
  org: Org | null;
  token: string | null;

  login: (data: { user: User; org: Org | null; token: string }) => void;
  logout: () => void;
  bootstrap: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // -------------------------
      // Initial state
      // -------------------------
      isAuthenticated: false,
      isBootstrapping: true,

      user: null,
      org: null,
      token: null,

      // -------------------------
      // Login
      // -------------------------
      login: ({ user, org, token }) => {
        set({
          isAuthenticated: true,
          isBootstrapping: false,
          user,
          org,
          token,
        });
      },

      // -------------------------
      // Logout
      // -------------------------
      logout: () => {
        set({
          isAuthenticated: false,
          isBootstrapping: false,
          user: null,
          org: null,
          token: null,
        });
      },

      // -------------------------
      // Bootstrap (refresh-safe)
      // -------------------------
      bootstrap: async () => {
        try {
          set({ isBootstrapping: true });

          const { user, org } = await fetchMe();

          set((state) => ({
            ...state,
            isAuthenticated: true,
            isBootstrapping: false,
            user,
            org,
          }));
        } catch {
          set({
            isAuthenticated: false,
            isBootstrapping: false,
            user: null,
            org: null,
            token: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
