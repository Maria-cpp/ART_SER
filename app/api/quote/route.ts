import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QUOTES_FILE = path.join(process.cwd(), "data", "quotes.json");

// POST /api/quote → append a quote request to data/quotes.json.
// NOTE: appends to the JSON file, so on Vercel's read-only FS this will fail.
// For production, send to email / CRM / a database instead (see CLAUDE.md §5).
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const submission = {
    id: `q-${Date.now()}`,
    receivedAt: new Date().toISOString(),
    ...body
  };

  try {
    const raw = await fs.readFile(QUOTES_FILE, "utf8");
    const json = JSON.parse(raw) as { submissions: unknown[] };
    json.submissions.push(submission);
    await fs.writeFile(QUOTES_FILE, JSON.stringify(json, null, 2) + "\n", "utf8");
    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    const message =
      err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "EROFS"
        ? "Filesystem is read-only (e.g. Vercel). Wire this route to email/CRM/DB — see CLAUDE.md §5."
        : "Could not save submission.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
