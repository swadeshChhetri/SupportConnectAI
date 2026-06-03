export type Ticket = {
  id: string;
  subject: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  createdAt: string;

  session?: {
    id: string;
    visitorName?: string | null;
  };

  assignedTo?: {
    id: string;
    name: string;
  } | null;

  sla: {
    firstResponseBreached: boolean;
    resolutionBreached: boolean;
  };
};
