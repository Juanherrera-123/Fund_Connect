import { NextResponse } from "next/server";

import { getAuthContext, isAdminRole } from "@/lib/server/guards";
import { listWaitlistRequestsByStatus } from "@/lib/server/waitlist";
import type { WaitlistStatus } from "@/lib/types";

const allowedStatuses = new Set<WaitlistStatus>(["PENDING", "APPROVED", "REJECTED"]);

export async function GET(request: Request) {
  const auth = getAuthContext(request);
  if (!auth || !isAdminRole(auth.role)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = (searchParams.get("status") ?? "PENDING").toUpperCase() as WaitlistStatus;

  if (!allowedStatuses.has(statusParam)) {
    return NextResponse.json({ error: "Invalid status filter." }, { status: 400 });
  }

  try {
    const waitlistRequests = await listWaitlistRequestsByStatus(statusParam);
    return NextResponse.json({ data: waitlistRequests }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load waitlist requests." }, { status: 500 });
  }
}
