import type {
  WidgetSession,
  WidgetMessage,
} from "../types/widget";

const BASE_URL = import.meta.env.VITE_WIDGET_API_URL;

/* --------------------------------------------------
   INTERNAL HELPER
-------------------------------------------------- */

async function widgetFetch<T>(
  url: string,
  options: RequestInit,
  widgetApiKey: string
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "x-widget-key": widgetApiKey,
    },
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Widget request failed");
  }

  return json.data;
}

/* --------------------------------------------------
   SESSION LIFECYCLE (REST)
-------------------------------------------------- */

// Create or resume a chat session
export async function createWidgetSession(
  payload: {
    visitorId: string;
    visitorName?: string;
  },
  widgetApiKey: string
): Promise<WidgetSession> {
  return widgetFetch<WidgetSession>(
    `${BASE_URL}/session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    widgetApiKey
  );
}

// Fetch historical messages
export async function fetchWidgetHistory(
  sessionId: string,
  widgetApiKey: string
): Promise<WidgetMessage[]> {
  return widgetFetch<WidgetMessage[]>(
    `${BASE_URL}/history/${sessionId}`,
    {
      method: "GET",
    },
    widgetApiKey
  );
}

// Close chat session
export async function closeWidgetSession(
  sessionId: string,
  widgetApiKey: string
): Promise<void> {
  await widgetFetch<void>(
    `${BASE_URL}/close`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    },
    widgetApiKey
  );
}

/* --------------------------------------------------
   FILE UPLOAD (REST)
-------------------------------------------------- */

export async function uploadWidgetFile(
  sessionId: string,
  file: File,
  widgetApiKey: string
): Promise<WidgetMessage> {
  const form = new FormData();
  form.append("file", file);

  return widgetFetch<WidgetMessage>(
    `${BASE_URL}/session/${sessionId}/upload`,
    {
      method: "POST",
      body: form,
    },
    widgetApiKey
  );
}