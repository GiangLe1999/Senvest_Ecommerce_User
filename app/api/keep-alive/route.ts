import { NextResponse } from "next/server";

export async function GET() {
  await fetch(process.env.NEXT_PUBLIC_APP_URL as string);

  return NextResponse.json({ ok: true });
}
