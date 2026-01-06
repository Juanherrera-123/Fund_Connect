type WaitlistEmailParams = {
  to: string;
  fundName: string;
  status: "approved" | "rejected";
};

export async function sendWaitlistStatusEmail({ to, fundName, status }: WaitlistEmailParams) {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Missing EMAIL_PROVIDER_API_KEY or EMAIL_FROM configuration.");
  }

  const subject =
    status === "approved"
      ? `IGATES — Waitlist approved for ${fundName}`
      : `IGATES — Waitlist update for ${fundName}`;
  const body =
    status === "approved"
      ? `Hello,\n\nYour waitlist request for ${fundName} has been approved. We will contact you to coordinate onboarding and allocation details.\n\nIGATES Team`
      : `Hello,\n\nYour waitlist request for ${fundName} was not approved at this time. We will follow up if availability changes.\n\nIGATES Team`;

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
