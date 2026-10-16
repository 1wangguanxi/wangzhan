export type AdminUser = { id: number; email: string; name: string };
export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};
export type Inquiry = {
  id: number;
  name: string;
  school: string;
  major: string;
  deadline: string;
  message: string;
  contact: string;
  status: "new" | "following" | "contacted" | "closed";
  notes: string;
  createdAt: string;
  updatedAt: string;
};
export type Asset = {
  id: number;
  path: string;
  name: string;
  alt: string;
  category: string;
  mime: string;
  bytes: number;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};
export type Audit = {
  id: number;
  actor: string;
  action: string;
  subject: string;
  createdAt: string;
};
export type Point = {
  time: string;
  views: number;
  clicks: number;
  submissions: number;
};
export type Dashboard = {
  generatedAt: string;
  since: string;
  until: string;
  bucketMinutes: number;
  views: number;
  clicks: number;
  contactClicks: number;
  sessions: number;
  active: number;
  submissions: number;
  convertedSessions: number;
  unattributed: number;
  previousViews: number;
  previousSubmissions: number;
  conversionRate: number;
  series: Point[];
  pages: { path: string; views: number; clicks: number }[];
  heatmap: { day: number; hour: number; views: number }[];
};
