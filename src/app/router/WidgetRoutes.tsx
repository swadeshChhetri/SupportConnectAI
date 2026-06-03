import type { RouteObject } from "react-router-dom";
import WidgetApp from "../../widget/WidgetApp";

export const widgetRoutes: RouteObject[] = [
  {
    path: "/widget-frame",
    element: <WidgetApp />
  }
];
