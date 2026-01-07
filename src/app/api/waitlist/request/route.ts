import { NextResponse } from "next/server";

import { getAuthContext, getNormalizedRequesterRole, isRequesterRole } from "@/lib/server/guards";
import { createWaitlistRequest } from "@/lib/server/waitlist";

type WaitlistRequestPayload = {
  fundId?: string;
  fundName?: string;
  qualified?: boolean;
  note?: string | null;
  user?: {
    name?: string;
    email?: string;
    country?: string;
    org?: string | null;
  };
};

export async function POST(request: Request) {
  let payload: WaitlistRequestPayload = {};

  try {
    payload = (await request.json()) as WaitlistRequestPayload;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const auth = getAuthContext(request);
  if (!auth || !isRequesterRole(auth.role)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { fundId, fundName, qualified, note, user } = payload;
  const requesterEmail = user?.email?.trim();

  if (!fundId || !fundName) {
    return NextResponse.json({ error: "fundId and fundName are required." }, { status: 400 });
  }

  if (!qualified) {
    return NextResponse.json({ error: "Qualified acknowledgment is required." }, { status: 400 });
  }

  if (!requesterEmail) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const requesterRole = getNormalizedRequesterRole(auth.role);
  if (!requesterRole) {
    return NextResponse.json({ error: "Invalid requester role." }, { status: 403 });
  }

  try {
    const waitlistRequest = await createWaitlistRequest({
      fundId,
      fundName,
      requesterId: auth.id,
      requesterRole,
      requesterEmail,
      requesterCountry: user?.country ?? "",
      requesterOrg: user?.org ?? null,
      note: note ?? null,
      status: "PENDING",
    });

    return NextResponse.json({ data: waitlistRequest }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create waitlist request." }, { status: 500 });
  }
}
