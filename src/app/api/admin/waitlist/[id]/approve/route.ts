import { NextResponse } from "next/server";

import { sendWaitlistStatusEmail } from "@/lib/email";
import { getAuthContext, isAdminRole } from "@/lib/server/guards";
import { getWaitlistRequestById, updateWaitlistStatus } from "@/lib/server/waitlist";

type DecisionPayload = {
  decisionNote?: string | null;
};

export async function POST(request: Request, context: { params: { id: string } }) {
  let payload: DecisionPayload = {};

  try {
    payload = (await request.json()) as DecisionPayload;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const auth = getAuthContext(request);
  if (!auth || !isAdminRole(auth.role)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const requestId = context.params.id;
  if (!requestId) {
    return NextResponse.json({ error: "Missing waitlist request id." }, { status: 400 });
  }

  const waitlistRequest = await getWaitlistRequestById(requestId);
  if (!waitlistRequest) {
    return NextResponse.json({ error: "Waitlist request not found." }, { status: 404 });
  }

  try {
    const origin = request.headers.get("origin");
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost ?? request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") ?? "https";
    const baseUrl = origin ?? (host ? `${protocol}://${host}` : "");
    const fundUrl = baseUrl
      ? `${baseUrl}/funds-explore?fund=${encodeURIComponent(waitlistRequest.fundName)}`
      : null;

    await updateWaitlistStatus({
      id: requestId,
      status: "APPROVED",
      approvedBy: auth.id,
      decisionNote: payload.decisionNote ?? null,
    });

    await sendWaitlistStatusEmail({
      to: waitlistRequest.requesterEmail,
      fundName: waitlistRequest.fundName,
      status: "approved",
      fundUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to approve waitlist request." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
