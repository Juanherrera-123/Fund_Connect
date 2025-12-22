import { NextResponse } from "next/server";

import { funds, insights } from "../data";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    funds: funds.length,
    insights: insights.length,
  });
}
