import { NextResponse } from "next/server";
import { EDITABLE_FILES } from "@/lib/data";

// GET /api/admin → list the files the admin dashboard may edit.
export async function GET() {
  return NextResponse.json({ files: EDITABLE_FILES });
}
