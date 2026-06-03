import WidgetChat from "./components/WidgetChat";
import { ThemeProvider } from "./context/ThemeContext";
import { useWidgetAuth } from "./context/WidgetAuthContext";

export default function WidgetApp() {
  const { widgetApiKey } = useWidgetAuth();

  return (
    <div className="h-full w-full bg-black">
      <ThemeProvider widgetApiKey={widgetApiKey}>
        <WidgetChat />
      </ThemeProvider>
    </div>
  );
}
