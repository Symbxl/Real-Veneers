import type { Metadata } from "next";
import { getLeads } from "@/lib/leads";
import LeadsDashboard from "@/components/LeadsDashboard";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

// Always render fresh — this is an internal dashboard, not a cached page.
export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await getLeads();
  return <LeadsDashboard leads={leads} />;
}
