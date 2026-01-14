import { NextResponse } from "next/server";

import { getAuthContext, getNormalizedRequesterRole, isRequesterRole } from "@/lib/server/guards";
import { createWaitlistRequest } from "@/lib/server/waitlist";

type WaitlistRequestPayload = {
  fundId?: string;
  fundName?: string;
  qualified?: boolean;
  note?: string | null;
  fundMinimum?: string | null;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    investmentAmount?: string;
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

  const { fundId, fundName, qualified, note, user, fundMinimum } = payload;
  const requesterEmail = user?.email?.trim();
  const requesterName = user?.name?.trim();
  const requesterPhone = user?.phone?.trim();
  const intendedInvestmentAmount = user?.investmentAmount?.trim();

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

  if (!intendedInvestmentAmount) {
    return NextResponse.json({ error: "Investment amount is required." }, { status: 400 });
  }

  const requesterRole =
    auth && isRequesterRole(auth.role)
      ? getNormalizedRequesterRole(auth.role) ?? "PUBLIC"
      : "PUBLIC";
  const requesterId =
    requesterRole === "PUBLIC"
      ? `public:${requesterEmail.toLowerCase()}`
      : auth?.id ?? `public:${requesterEmail.toLowerCase()}`;

  const numericAmount = Number.parseFloat(
    intendedInvestmentAmount.replace(/[^0-9.,]/g, "").replace(/,/g, "")
  );
  if (!Number.isFinite(numericAmount) || numericAmount < 1000) {
    return NextResponse.json({ error: "Investment amount must be at least 1000 USD." }, { status: 400 });
  }
  if (fundMinimum) {
    const minimumValue = Number.parseFloat(fundMinimum.replace(/[^0-9.,]/g, "").replace(/,/g, ""));
    if (Number.isFinite(minimumValue) && numericAmount < minimumValue) {
      return NextResponse.json(
        { error: "Investment amount must meet the fund minimum." },
        { status: 400 }
      );
    }
  }

  try {
    const waitlistRequest = await createWaitlistRequest({
      fundId,
      fundName,
      requesterId,
      requesterRole,
      requesterName,
      requesterEmail,
      requesterPhone,
      intendedInvestmentAmount,
      amount: numericAmount,
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
