import React, { createContext, useContext, useEffect, useState } from "react";

export interface ThemeConfig {
  primaryColor: string;
  orgLogo?: string;
  aiAvatar?: string;
  welcomeMessage?: string;
  position?: "left" | "right";
}

interface ThemeContextValue extends ThemeConfig {
  loading: boolean;
  error: string | null;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  orgId,
  widgetApiKey,
  children,
}: {
  orgId?: string;
  widgetApiKey?: string;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeConfig>({
    primaryColor: "#2563eb", // default blue
    position: "right",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch theme from backend
  useEffect(() => {
    async function loadTheme() {
      // Don't fetch if neither is provided
      if (!orgId && !widgetApiKey) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Fetch by orgId or widgetApiKey
        const identifier = orgId || widgetApiKey;
        const queryParam = orgId ? "" : "?isApiKey=true";
        
        const baseUrl = import.meta.env.VITE_WIDGET_API_URL;
        
        const res = await fetch(
          `${baseUrl}/theme/${identifier}${queryParam}`
        );

        if (!res.ok) throw new Error("Failed to load theme");

        const json = await res.json();
        if (!json.success) throw new Error(json.message);

        setTheme((prev) => ({
          ...prev,
          ...json.data, // merge backend config
        }));
      } catch (err: any) {
        setError(err?.message ?? "Failed to load theme");
      } finally {
        setLoading(false);
      }
    }

    loadTheme();
  }, [orgId]);

  return (
    <ThemeContext.Provider
      value={{
        ...theme,
        loading,
        error,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useTheme must be used inside <ThemeProvider />");

  return ctx;
}
