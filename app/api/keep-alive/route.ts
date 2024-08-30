import { NextResponse } from "next/server";

export async function GET() {
  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}`);

  return NextResponse.json({ ok: true });
}
