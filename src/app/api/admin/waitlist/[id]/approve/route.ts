import { NextResponse } from "next/server";

import { sendWaitlistStatusEmail } from "@/lib/email";
import { getAuthContext, isAdminRole } from "@/lib/server/guards";
import { getWaitlistRequestById, updateWaitlistStatus } from "@/lib/server/waitlist";

export async function POST(request: Request, context: { params: { id: string } }) {
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
    let decisionNote: string | null = null;
    try {
      const body = (await request.json()) as { decisionNote?: string | null };
      decisionNote = body?.decisionNote?.trim() || null;
    } catch (error) {
      if (error instanceof SyntaxError) {
        return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
      }
    }

    const origin = request.headers.get("origin");
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost ?? request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") ?? "https";
    const baseUrl = origin ?? (host ? `${protocol}://${host}` : "");
    const fundUrl = baseUrl
      ? `${baseUrl}/gestores-verificados?fund=${encodeURIComponent(waitlistRequest.fundName)}`
      : null;

    await updateWaitlistStatus({
      id: requestId,
      status: "APPROVED",
      approvedBy: auth.id,
      decisionNote,
    });

    await sendWaitlistStatusEmail({
      to: waitlistRequest.email,
      fundName: waitlistRequest.fundName,
      status: "APPROVED",
      fundUrl,
      requesterName: waitlistRequest.fullName,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to approve waitlist request." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
