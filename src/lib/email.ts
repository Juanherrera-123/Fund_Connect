type WaitlistEmailParams = {
  to: string;
  fundName: string;
  status: "approved" | "rejected";
  requesterName?: string | null;
  fundUrl?: string | null;
};

export async function sendWaitlistStatusEmail({
  to,
  fundName,
  status,
  requesterName,
  fundUrl,
}: WaitlistEmailParams) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Missing EMAIL_PROVIDER_API_KEY or EMAIL_FROM configuration.");
  }

  const greeting = requesterName ? `Hello ${requesterName},` : "Hello,";
  const callToAction = fundUrl
    ? `View the fund page: ${fundUrl}`
    : "View the fund page on IGATES.";
  const subject =
    status === "approved"
      ? `IGATES — You're approved for ${fundName}`
      : `IGATES — Waitlist update for ${fundName}`;
  const body =
    status === "approved"
      ? `${greeting}\n\nGreat news — your waitlist request for ${fundName} has been approved.\n\n${callToAction}\n\nOur team will follow up with onboarding and allocation details.\n\nIGATES Team`
      : `${greeting}\n\nYour waitlist request for ${fundName} was not approved at this time. We will follow up if availability changes.\n\nIGATES Team`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text: body,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to send email: ${response.status} ${errorBody}`);
  }
}
