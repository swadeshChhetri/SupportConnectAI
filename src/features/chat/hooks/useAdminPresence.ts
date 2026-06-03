import { useEffect, useState } from "react";
import { adminSocket } from "../socket/adminSocket";

export function useAdminPresence() {
  const [presence, setPresence] = useState<Record<string, boolean>>({});

  useEffect(() => {
    adminSocket.on("presence:update", (data) => {
      setPresence(data);
    });

    return () => {
      adminSocket.off("presence:update");
    };
  }, []);

  return presence;
}
