import { NextResponse } from "next/server";

import { insights } from "../data";

export async function GET() {
  return NextResponse.json(insights);
}
