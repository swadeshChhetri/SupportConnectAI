export type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

export type Subscription = {
  planId: string;
  status: "active" | "trialing" | "canceled";
  renewsOn: string;
  usage: {
    chatsUsed: number;
    chatsLimit: number;
    docsUsed: number;
    docsLimit: number;
    agentsUsed: number;
    agentsLimit: number;
  };
};

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  pdfUrl: string;
};

const mockPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 19,
    features: ["200 AI messages", "2 agents", "Basic analytics"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    features: ["Unlimited messages", "10 agents", "Advanced analytics"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 149,
    features: ["Unlimited everything", "Priority support", "Custom integrations"],
  },
];

let mockSubscription: Subscription = {
  planId: "starter",
  status: "active",
  renewsOn: new Date(Date.now() + 7 * 86400000).toISOString(),
  usage: {
    chatsUsed: 120,
    chatsLimit: 200,
    docsUsed: 5,
    docsLimit: 20,
    agentsUsed: 1,
    agentsLimit: 2,
  },
};

let mockInvoices: Invoice[] = [
  {
    id: "inv1",
    date: "2025-02-01",
    amount: 19,
    status: "paid",
    pdfUrl: "/invoice1.pdf",
  },
  {
    id: "inv2",
    date: "2025-01-01",
    amount: 19,
    status: "paid",
    pdfUrl: "/invoice2.pdf",
  },
];

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const fetchPlans = async (): Promise<Plan[]> => {
  await wait();
  return mockPlans;
};

export const fetchSubscription = async (): Promise<Subscription> => {
  await wait();
  return mockSubscription;
};

export const updateSubscription = async (planId: string): Promise<boolean> => {
  await wait();
  mockSubscription.planId = planId;
  return true;
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  await wait();
  return mockInvoices;
};
