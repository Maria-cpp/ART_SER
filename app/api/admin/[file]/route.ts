import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isEditableFile } from "@/lib/data";

// Run on the Node.js runtime (needs fs).
export const runtime = "nodejs";
// Never cache admin reads.
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");

function resolveSafe(file: string): string | null {
  // Allowlist + basename check guard against path traversal.
  if (!isEditableFile(file)) return null;
  const resolved = path.join(DATA_DIR, file);
  if (path.dirname(resolved) !== DATA_DIR) return null;
  return resolved;
}

// GET /api/admin/:file → parsed JSON for one data file.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const target = resolveSafe(file);
  if (!target) return NextResponse.json({ error: "File not editable." }, { status: 400 });

  try {
    const raw = await fs.readFile(target, "utf8");
    return NextResponse.json({ file, data: JSON.parse(raw) });
  } catch {
    return NextResponse.json({ error: "Could not read file." }, { status: 500 });
  }
}

// POST /api/admin/:file → validate + overwrite one data file.
// Body: the full JSON object to write (or { data: <object> }).
export async function POST(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const target = resolveSafe(file);
  if (!target) return NextResponse.json({ error: "File not editable." }, { status: 400 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Accept either the raw object or { data: object }.
  const payload =
    body && typeof body === "object" && "data" in (body as Record<string, unknown>)
      ? (body as Record<string, unknown>).data
      : body;

  const serialized = JSON.stringify(payload, null, 2) + "\n";

  try {
    await fs.writeFile(target, serialized, "utf8");
    return NextResponse.json({ ok: true, file });
  } catch (err) {
    // Vercel's serverless runtime has a read-only filesystem — writes fail there.
    const message =
      err && typeof err === "object" && "code" in err && (err as { code?: string }).code === "EROFS"
        ? "Filesystem is read-only (e.g. Vercel serverless). Run the admin locally and commit the JSON, or wire a storage backend — see CLAUDE.md §5."
        : "Could not write file.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
