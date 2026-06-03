export type AISettings = {
  persona: string;
  tone: "formal" | "friendly" | "professional";
  confidenceThreshold: number;
  capabilities: {
    refund: boolean;
    trackOrder: boolean;
    troubleshooting: boolean;
    faq: boolean;
  };
};

export type EscalationRules = {
  lowConfidence: boolean;
  angrySentiment: boolean;
  longMessages: boolean;
  keywordEscalation: string[];
};

let settings: AISettings = {
  persona: "You are a helpful support assistant trained on company policies.",
  tone: "friendly",
  confidenceThreshold: 0.65,
  capabilities: {
    refund: false,
    trackOrder: true,
    troubleshooting: true,
    faq: true,
  },
};

let rules: EscalationRules = {
  lowConfidence: true,
  angrySentiment: true,
  longMessages: false,
  keywordEscalation: ["refund", "cancel order"],
};

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const fetchAISettings = async (): Promise<AISettings> => {
  await wait();
  return settings;
};

export const updateAISettings = async (data: AISettings): Promise<boolean> => {
  await wait();
  settings = data;
  return true;
};

export const fetchEscalationRules = async (): Promise<EscalationRules> => {
  await wait();
  return rules;
};

export const updateEscalationRules = async (
  data: EscalationRules
): Promise<boolean> => {
  await wait();
  rules = data;
  return true;
};
