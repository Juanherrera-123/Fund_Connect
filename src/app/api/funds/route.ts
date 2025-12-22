import { NextResponse } from "next/server";

import { funds } from "../data";

export async function GET() {
  return NextResponse.json(funds);
}
