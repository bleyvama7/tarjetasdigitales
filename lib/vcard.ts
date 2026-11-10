export type VCardData = {
  fullName: string;
  title?: string;
  company?: string;
  phone: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  note?: string;
  photoUrl?: string;
  socials?: { label: string; url: string }[];
};

const escape = (s = "") =>
  s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

export function buildVCard(d: VCardData): string {
  const parts = (d.fullName || "").trim().split(/\s+/);
  const firstName = parts.shift() || "";
  const lastName = parts.join(" ");

  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escape(lastName)};${escape(firstName)};;;`,
    `FN:${escape(d.fullName)}`,
  ];

  if (d.company) lines.push(`ORG:${escape(d.company)}`);
  if (d.title) lines.push(`TITLE:${escape(d.title)}`);
  if (d.phone) lines.push(`TEL;TYPE=CELL,VOICE:${d.phone.replace(/\D/g, "")}`);
  if (d.email) lines.push(`EMAIL;TYPE=WORK,INTERNET:${escape(d.email)}`);
  if (d.website) lines.push(`URL:${d.website}`);
  if (d.address) {
    lines.push(
      `ADR;TYPE=WORK:;;${escape(d.address)};${escape(d.city || "")};;;${escape(d.country || "")}`
    );
  }
  if (d.note) lines.push(`NOTE:${escape(d.note)}`);
  if (d.photoUrl) lines.push(`PHOTO;VALUE=URI:${d.photoUrl}`);

  if (d.socials?.length) {
    for (const s of d.socials) {
      lines.push(`URL;TYPE=${escape(s.label)}:${s.url}`);
    }
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}