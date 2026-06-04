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
    price: 2499,
    features: [
      "500 replies / month",
      "Upload up to 10 documents",
      "Basic AI Agent resolution",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 7999,
    features: [
      "5,000 replies / month",
      "Upload up to 100 documents",
      "Advanced AI Agent resolution",
      "Slack & email support",
      "Advanced analytics desk",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 15999,
    features: [
      "Unlimited AI replies / month",
      "Unlimited document uploads",
      "Custom model training & SLAs",
      "Dedicated support manager",
      "Organization data isolation",
    ],
  },
];

let mockSubscription: Subscription = {
  planId: "starter",
  status: "active",
  renewsOn: new Date(Date.now() + 7 * 86400000).toISOString(),
  usage: {
    chatsUsed: 120,
    chatsLimit: 500,
    docsUsed: 5,
    docsLimit: 10,
    agentsUsed: 1,
    agentsLimit: 2,
  },
};

let mockInvoices: Invoice[] = [
  {
    id: "inv1",
    date: "2026-05-01",
    amount: 2499,
    status: "paid",
    pdfUrl: "/invoice1.pdf",
  },
  {
    id: "inv2",
    date: "2026-04-01",
    amount: 2499,
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
