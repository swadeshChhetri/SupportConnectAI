export type TicketMessage = {
  id: string;
  sender: "customer" | "agent";
  message: string;
  createdAt: string;
};

export type TicketDetail = {
  id: string;
  subject: string;
  status: "open" | "pending" | "closed";
  priority: "low" | "medium" | "high";
  customer: string;
  createdAt: string;
  messages: TicketMessage[];
};

// Mock Ticket Detail
const mockTicketDetail = (id: string): TicketDetail => ({
  id,
  subject: `Issue with order #${id}`,
  status: "open",
  priority: "medium",
  customer: "Aman Sharma",
  createdAt: new Date().toISOString(),
  messages: [
    {
      id: "1",
      sender: "customer",
      message: "Hello, I have an issue with my order.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      sender: "agent",
      message: "Sure, can you provide more details?",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "3",
      sender: "customer",
      message: "I received a damaged product.",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
  ],
});

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchTicketDetail = async (
  ticketId: string,
): Promise<TicketDetail> => {
  await wait(200);
  return mockTicketDetail(ticketId);
};

export const sendTicketMessage = async (
  ticketId: string,
  message: string,
): Promise<TicketMessage> => {
  await wait(200);

  return {
    id: Math.random().toString(),
    sender: "agent",
    message,
    createdAt: new Date().toISOString(),
  };
};
