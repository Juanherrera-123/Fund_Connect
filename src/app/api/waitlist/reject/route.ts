import { NextResponse } from "next/server";

import { sendWaitlistStatusEmail } from "@/lib/email";

type WaitlistDecisionPayload = {
  requestId?: string;
  reviewerId?: string;
  reviewerRole?: string;
  requesterEmail?: string;
  requesterName?: string;
  fundName?: string;
};

export async function POST(request: Request) {
  let payload: WaitlistDecisionPayload = {};

  try {
    payload = (await request.json()) as WaitlistDecisionPayload;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { reviewerRole, requesterEmail, fundName } = payload;

  if (reviewerRole !== "MasterUser") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (!requesterEmail || !fundName) {
    return NextResponse.json({ error: "requesterEmail and fundName are required." }, { status: 400 });
  }

  try {
    await sendWaitlistStatusEmail({ to: requesterEmail, fundName, status: "rejected" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
