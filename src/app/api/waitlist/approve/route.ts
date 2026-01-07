import { NextResponse } from "next/server";

import { sendWaitlistStatusEmail } from "@/lib/email";
import { getAuthContext, isAdminRole } from "@/lib/server/guards";

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

  const { requesterEmail, fundName, requesterName } = payload;
  const auth = getAuthContext(request);
  if (!auth || !isAdminRole(auth.role)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  if (!requesterEmail || !fundName) {
    return NextResponse.json({ error: "requesterEmail and fundName are required." }, { status: 400 });
  }

  try {
    const origin = request.headers.get("origin");
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost ?? request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") ?? "https";
    const baseUrl = origin ?? (host ? `${protocol}://${host}` : "");
    const fundUrl = baseUrl ? `${baseUrl}/funds-explore?fund=${encodeURIComponent(fundName)}` : null;
    const trimmedRequesterName = requesterName?.trim();

    await sendWaitlistStatusEmail({
      to: requesterEmail,
      fundName,
      status: "approved",
      requesterName: trimmedRequesterName || null,
      fundUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
