import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? null,
    hasKey: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? null,
  });
}
