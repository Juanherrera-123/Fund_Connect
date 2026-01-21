import { NextResponse } from "next/server";

import { getAuthContext } from "@/lib/server/guards";
import { createWaitlistRequest } from "@/lib/server/waitlist";

type WaitlistRequestPayload = {
  fundId?: string;
  fundName?: string;
  qualified?: boolean;
  note?: string | null;
  intendedInvestmentAmount?: string;
  user?: {
    fullName?: string;
    email?: string;
    phone?: string;
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

  const { fundId, fundName, qualified, note, user, intendedInvestmentAmount } = payload;
  const requesterEmail = user?.email?.trim();
  const requesterName = user?.fullName?.trim();
  const requesterPhone = user?.phone?.trim();
  const investmentAmount = intendedInvestmentAmount?.trim();

  if (!fundId || !fundName) {
    return NextResponse.json({ error: "fundId and fundName are required." }, { status: 400 });
  }

  if (!qualified) {
    return NextResponse.json({ error: "Qualified acknowledgment is required." }, { status: 400 });
  }

  if (!requesterEmail) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(requesterEmail)) {
    return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
  }

  if (!requesterName) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }

  if (!requesterPhone) {
    return NextResponse.json({ error: "Phone is required." }, { status: 400 });
  }

  const normalizedInvestmentAmount = investmentAmount?.trim() || null;

  try {
    const { waitlistRequest, wasExisting } = await createWaitlistRequest({
      fundId,
      fundName,
      fullName: requesterName,
      email: requesterEmail,
      phone: requesterPhone,
      intendedInvestmentAmount: normalizedInvestmentAmount ?? "",
      note: note ?? null,
      status: "PENDING",
      requesterUid: auth?.id ?? null,
    });

    const statusCode = wasExisting ? 200 : 201;
    return NextResponse.json(
      { id: waitlistRequest.id, status: waitlistRequest.status },
      { status: statusCode }
    );
  } catch (error) {
    const err = error as { message?: string; code?: string; stack?: string };
    console.error("[waitlist/request] createWaitlistRequest failed", {
      message: err?.message ?? String(error),
      code: err?.code,
      stack: err?.stack,
    });
    return NextResponse.json(
      {
        error: "Unable to create waitlist request.",
        details:
          process.env.NODE_ENV === "development" ? String(err?.message ?? error) : undefined,
      },
      { status: 500 }
    );
  }
}
