// ------------------------------------------------------
// Widget Message Types (MVP scalable schema)
// ------------------------------------------------------

export type Sender = "user" | "AI";

export type MessageType =
  | "text"
  | "file"
  | "list"
  | "buttons"
  | "form"
  | "system"
  | "error"
  | "typing"
  | "stream";

// ------------------------------------------------------
// Base message fields
// ------------------------------------------------------

export interface BaseMessage {
  id: string;
  sessionId: string;
  sender: Sender;
  type: MessageType;
  createdAt: string;
  metadata?: Record<string, any>; // optional analytics/useful metadata
}

// ------------------------------------------------------
// Text message
// ------------------------------------------------------

export interface TextMessage extends BaseMessage {
  type: "text";
  text: string;
}

// ------------------------------------------------------
// File message
// ------------------------------------------------------

export interface FileMessage extends BaseMessage {
  type: "file";
  fileUrl: string;
  fileType: string; // e.g. "image/png", "application/pdf"
  fileName?: string;
}

// ------------------------------------------------------
// List message
// ------------------------------------------------------

export interface ListMessage extends BaseMessage {
  type: "list";
  items: string[];
  ordered?: boolean; // allows bullet list or numbered
}

// ------------------------------------------------------
// Buttons / Quick Replies
// ------------------------------------------------------

export interface ButtonsMessage extends BaseMessage {
  type: "buttons";
  buttons: string[]; // text for each button
}

// ------------------------------------------------------
// Dynamic Form Message (lead capture/contact form/etc.)
// ------------------------------------------------------

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[]; // only for select
}

export interface FormMessage extends BaseMessage {
  type: "form";
  title?: string;
  fields: FormField[];
  submitLabel?: string; // default "Submit"
  submitTo: string; // API endpoint
}

// ------------------------------------------------------
// System / informational message (non-AI)
// ------------------------------------------------------

export interface SystemMessage extends BaseMessage {
  type: "system";
  text: string;
}

// ------------------------------------------------------
// Error message bubble
// ------------------------------------------------------

export interface ErrorMessage extends BaseMessage {
  type: "error";
  errorText: string;
  retryable?: boolean;
}

export interface TypingMessage extends BaseMessage {
  type: "typing";
}

export interface StreamMessage extends BaseMessage {
  type: "stream";
  text: string; // partial AI text
}

// ------------------------------------------------------
// Union of all widget messages
// ------------------------------------------------------

export type WidgetMessage =
  | TextMessage
  | FileMessage
  | ListMessage
  | ButtonsMessage
  | FormMessage
  | SystemMessage
  | ErrorMessage
  | TypingMessage
  | StreamMessage;

// ------------------------------------------------------
// Theme Configuration (from backend)
// ------------------------------------------------------

export interface ThemeConfig {
  primaryColor: string;
  bubbleColor?: string;
  aiAvatar?: string;
  orgLogo?: string;
  position?: "left" | "right";
  welcomeMessage?: string;
}

export interface WidgetSession {
  id: string;                 // sessionId
  orgId: string;              // tenant ID
  visitorId: string;          // from cookies / fingerprint
  visitorName?: string;       // optional, can be filled later
  status: "active" | "closed";

  createdAt: string;
  updatedAt: string;

  // Optional configuration/useful metadata
  theme?: ThemeConfig;        // backend can provide dynamic widget theming
  unreadCount?: number;       // for UI badge
  lastMessagePreview?: string;
}

