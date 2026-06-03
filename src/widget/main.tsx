import { createRoot } from "react-dom/client";
import WidgetApp from "./WidgetApp";
import { WidgetAuthProvider } from "./context/WidgetAuthContext";
import "./styles.css";

const root = document.getElementById("widget-root");

if (!root) {
  throw new Error("Widget root element not found");
}


// 🔑 widget identity (tenant auth)
const params = new URLSearchParams(location.search);
const widgetApiKey = params.get("apiKey");


if (!widgetApiKey) {
  createRoot(root).render(
    <div style={{ padding: 20 }}>
      Widget misconfigured — missing API key
    </div>
  );
} else {
  createRoot(root).render(
    <WidgetAuthProvider widgetApiKey={widgetApiKey}>
      <WidgetApp />
    </WidgetAuthProvider>
  );
}
