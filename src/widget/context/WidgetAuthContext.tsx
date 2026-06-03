import { createContext, useContext } from "react";

type WidgetAuthContextValue = {
  widgetApiKey: string;
};

const WidgetAuthContext = createContext<WidgetAuthContextValue | null>(null);

export function WidgetAuthProvider({
  widgetApiKey,
  children,
}: {
  widgetApiKey: string;
  children: React.ReactNode;
}) {
  return (
    <WidgetAuthContext.Provider value={{ widgetApiKey }}>
      {children}
    </WidgetAuthContext.Provider>
  );
}

export function useWidgetAuth() {
  const ctx = useContext(WidgetAuthContext);
  if (!ctx) {
    throw new Error(
      "useWidgetAuth must be used inside WidgetAuthProvider"
    );
  }
  return ctx;
}
