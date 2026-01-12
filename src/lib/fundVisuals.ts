export const PREMIUM_THRESHOLD = 5000000;

export const parseCapitalAllocation = (amount?: string | null): number | null => {
  if (!amount) return null;
  const normalized = amount.replace(/[,\s]/g, "").replace(/[^0-9.]/g, "");
  if (!normalized) return null;
  const parsed = Number.parseFloat(normalized);
  return Number.isNaN(parsed) ? null : parsed;
};

export const getFundFrameClass = (capitalAllocated?: number | null) => {
  const resolved = typeof capitalAllocated === "number" && !Number.isNaN(capitalAllocated)
    ? capitalAllocated
    : 0;

  if (resolved <= 0) {
    return "igates-card-frame--institutional";
  }

  if (resolved < PREMIUM_THRESHOLD) {
    return "igates-card-frame--advanced";
  }

  return "igates-card-frame--premium";
};
