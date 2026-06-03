import { api } from "../../../shared/api/axiosClient";
import InvoiceRow from './../../../shared/components/ui/InvoiceRow';

export type Ticket = {
  id: string;
  subject: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  createdAt: string;


  assignedTo?: {
    id: string;
    name: string;
  } | null;

  session?: {
    id: string;
    visitorName?: string | null;
  };

  sla?: {
    firstResponseBreached: boolean;
    resolutionBreached: boolean;
  };
};

export type TicketDetail = {
  id: string;
  subject: string;
  description?: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  createdAt: string;

  customer: string;
  assignedToMe: boolean;

  messages: {
    id: string;
    sender: "CUSTOMER" | "AGENT" | "AI";
    message: string;
    createdAt: string;
  }[];
};


// Filters sent to the backend
export type TicketQueryParams = {
  search?: string;
  status?: string;
  priority?: string;
};

export async function fetchTickets(params: TicketQueryParams & {
  page?: number;
  limit?: number;
}) {
  const res = await api.get("/tickets", { params });
  console.log("Printing Ticket lists", res);
  return res.data.data as Ticket[];
}

export async function fetchTicketById(id: string) {
  const res = await api.get(`/tickets/${id}`);
  return res.data.data as TicketDetail;
}

export type SendTicketReplyPayload = {
  message: string;
};

export type TicketMessage = {
  id: string;
  sender: "CUSTOMER" | "AGENT" | "AI";
  message: string;
  createdAt: string;
};

export async function sendTicketReply(
  ticketId: string,
  payload: SendTicketReplyPayload
) {
  const res = await api.post(`/tickets/${ticketId}/reply`, payload);

  return res.data.data as TicketMessage;
}

export async function updateTicketStatus(
  ticketId: string,
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
) {
  await api.patch(`/tickets/${ticketId}`, {
    status,
  });
}


