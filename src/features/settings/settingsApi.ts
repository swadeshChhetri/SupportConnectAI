export type OrgSettings = {
  name: string;
  timezone: string;
  logoUrl?: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "AGENT";
};

export type Member = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "AGENT";
  status: "active" | "invited";
};

let org: OrgSettings = {
  name: "Acme Corp",
  timezone: "Asia/Kolkata",
  logoUrl: "",
};

let profile: UserProfile = {
  id: "1",
  name: "Swadesh",
  email: "swadesh@example.com",
  role: "ADMIN",
};

let members: Member[] = [
  { id: "1", name: "Swadesh", email: "admin@acme.com", role: "ADMIN", status: "active" },
  { id: "2", name: "Aman", email: "aman@acme.com", role: "AGENT", status: "active" },
  { id: "3", name: "Rahul", email: "rahul@acme.com", role: "AGENT", status: "invited" },
];

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ---- ORG SETTINGS ----
export const fetchOrgSettings = async () => {
  await wait();
  return org;
};

export const updateOrgSettings = async (data: OrgSettings) => {
  await wait();
  org = data;
  return true;
};

// ---- USER PROFILE ----
export const fetchUserProfile = async () => {
  await wait();
  return profile;
};

export const updateUserProfile = async (data: Partial<UserProfile>) => {
  await wait();
  profile = { ...profile, ...data };
  return true;
};

// ---- MEMBERS ----
export const fetchMembers = async () => {
  await wait();
  return members;
};

export const inviteMember = async (email: string, role: "ADMIN" | "AGENT") => {
  await wait();
  members.push({
    id: Date.now().toString(),
    name: "Pending User",
    email,
    role,
    status: "invited",
  });
  return true;
};

export const updateMemberRole = async (id: string, role: "ADMIN" | "AGENT") => {
  await wait();
  members = members.map((m) => (m.id === id ? { ...m, role } : m));
  return true;
};

export const removeMember = async (id: string) => {
  await wait();
  members = members.filter((m) => m.id !== id);
  return true;
};
