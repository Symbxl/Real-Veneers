// Lead submissions from the Free Smile Consultation forms.
//
// Both forms on the site (one in the Hero section, one in the Contact
// section) render the same <HeroForm /> component. The `source` field
// records which one a visitor used.
//
// Storage: a JSON file at `data/leads.json`, seeded on first read. This
// gives real, persistent CRUD for local/self-hosted use. When the
// Supabase table is ready, swap the bodies of the functions below for
// queries — the exported signatures already match what the app expects.

import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type LeadSource = "Hero section" | "Contact section";

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  source: LeadSource;
  submittedAt: string; // ISO 8601
};

export type LeadInput = Omit<Lead, "id">;

export const LEAD_SOURCES: LeadSource[] = [
  "Hero section",
  "Contact section",
];

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

const SEED_LEADS: Lead[] = [
  {
    id: "seed-1",
    firstName: "Madison",
    lastName: "Carter",
    phone: "(281) 555-0142",
    source: "Hero section",
    submittedAt: "2026-05-20T14:32:00-05:00",
  },
  {
    id: "seed-2",
    firstName: "Devon",
    lastName: "Nguyen",
    phone: "(832) 555-0198",
    source: "Contact section",
    submittedAt: "2026-05-20T11:07:00-05:00",
  },
  {
    id: "seed-3",
    firstName: "Priya",
    lastName: "Sharma",
    phone: "(713) 555-0176",
    source: "Hero section",
    submittedAt: "2026-05-19T16:45:00-05:00",
  },
  {
    id: "seed-4",
    firstName: "Marcus",
    lastName: "Bell",
    phone: "(281) 555-0123",
    source: "Contact section",
    submittedAt: "2026-05-19T09:18:00-05:00",
  },
  {
    id: "seed-5",
    firstName: "Hannah",
    lastName: "Reyes",
    phone: "(832) 555-0210",
    source: "Hero section",
    submittedAt: "2026-05-18T13:51:00-05:00",
  },
];

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    // File missing or unreadable — seed it and return the seed.
    await writeAll(SEED_LEADS);
    return SEED_LEADS;
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf8");
}

function byNewest(a: Lead, b: Lead): number {
  return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
}

/** All lead submissions, newest first. */
export async function getLeads(): Promise<Lead[]> {
  const leads = await readAll();
  return [...leads].sort(byNewest);
}

/** Create a new lead and return it. */
export async function createLead(input: LeadInput): Promise<Lead> {
  const leads = await readAll();
  const lead: Lead = { id: randomUUID(), ...input };
  leads.push(lead);
  await writeAll(leads);
  return lead;
}

/** Update an existing lead by id and return it. */
export async function updateLead(
  id: string,
  input: LeadInput
): Promise<Lead> {
  const leads = await readAll();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) throw new Error("Lead not found.");
  leads[index] = { id, ...input };
  await writeAll(leads);
  return leads[index];
}

/** Delete a lead by id. */
export async function deleteLead(id: string): Promise<void> {
  const leads = await readAll();
  const next = leads.filter((lead) => lead.id !== id);
  if (next.length === leads.length) throw new Error("Lead not found.");
  await writeAll(next);
}
