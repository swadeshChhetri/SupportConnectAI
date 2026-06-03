import { useState, useEffect, useRef } from "react";
import { createWidgetSession } from "../api/widgetApi";
import { useWidgetAuth } from "../context/WidgetAuthContext";
import { generateId } from "../../utils/generateId";


interface SessionResult {
  sessionId: string | null;
  visitorId: string;
  loading: boolean;
  error: string | null;
  retrySession: () => void;
}

export function useWidgetSession(): SessionResult {
  const { widgetApiKey } = useWidgetAuth();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorId] = useState(getOrCreateVisitorId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const retryCount = useRef(0);
  const maxRetries = 5;

  // -----------------------------------------
  // Load or Generate Visitor ID (Persistent)
  // -----------------------------------------
  function getOrCreateVisitorId(): string {
    let vid = localStorage.getItem("widget_visitor_id");
    if (!vid) {
      vid = generateId();
      localStorage.setItem("widget_visitor_id", vid);
    }
    return vid;
  }

  // -----------------------------------------
  // Create session with retry logic
  // -----------------------------------------
  async function createSession() {
    setLoading(true);
    setError(null);

    try {
      const session = await createWidgetSession(
        { visitorId },
        widgetApiKey
      );

      setSessionId(session.id);
      retryCount.current = 0;
      setLoading(false);

      // Emit event → For analytics
      window.dispatchEvent(
        new CustomEvent("widget_session_created", {
          detail: { sessionId: session.id, visitorId },
        })
      );
    } catch (err: any) {
      retryCount.current += 1;

      if (retryCount.current < maxRetries) {
        console.warn(
          `Session creation failed. Retrying ${retryCount.current}/${maxRetries}...`
        );

        setTimeout(createSession, 800 * retryCount.current);
      } else {
        setError("Unable to start session. Please try again.");
        setLoading(false);
      }
    }
  }

  // -----------------------------------------
  // Auto-create session on mount
  // -----------------------------------------
  useEffect(() => {
    createSession();
    // widgetApiKey is stable per widget load
  }, [widgetApiKey]);

  // Manual retry option (exposed to UI)
  function retrySession() {
    retryCount.current = 0;
    createSession();
  }

  return {
    sessionId,
    visitorId,
    loading,
    error,
    retrySession,
  };
}

