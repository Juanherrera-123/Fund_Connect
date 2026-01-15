"use client";

import { useMemo } from "react";

import DataTable, { StatusCell } from "@/components/dashboard/DataTable";
import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { UserProfile, WaitlistRequest, WaitlistStatus } from "@/lib/types";

const statusConfig: Record<WaitlistStatus, { label: string; tone: "warning" | "success" | "danger" }> =
  {
    PENDING: { label: "Pendiente", tone: "warning" },
    APPROVED: { label: "Aprobada", tone: "success" },
    REJECTED: { label: "Rechazada", tone: "danger" },
  };

export default function MasterRequestsPage() {
  const [waitlistRequests] = useFirebaseStorage<WaitlistRequest[]>(
    STORAGE_KEYS.waitlistRequests,
    []
  );
  const [profiles] = useFirebaseStorage<UserProfile[]>(
    STORAGE_KEYS.profiles,
    []
  );

  const rows = useMemo(() => {
    const requesterNameById = new Map(
      profiles.map((profile) => [profile.id, profile.fullName])
    );

    return waitlistRequests.map((request) => {
      const status = statusConfig[request.status];
      return {
        id: request.id,
        fund: request.fundName,
        investor: requesterNameById.get(request.requesterId) ?? request.requesterEmail,
        country: request.requesterCountry ?? "—",
        status: (
          <StatusCell label={status.label} tone={status.tone} />
        ),
      };
    });
  }, [profiles, waitlistRequests]);

  return (
    <>
      <header className="flex flex-col gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          data-i18n="dashboardLabel"
        >
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-900" data-i18n="dashboardTitleRequests">
          Requests
        </h1>
        <p className="text-sm text-slate-600">
          Revisa las solicitudes de inversión y su estado actual.
        </p>
      </header>

      <DataTable
        title="Waitlist"
        titleKey="dashboardWaitlist"
        actionLabel="Review"
        actionLabelKey="dashboardReviewAction"
        columns={[
          { key: "fund", label: "Fund", labelKey: "dashboardColumnFund" },
          { key: "investor", label: "Investor", labelKey: "dashboardColumnInvestor" },
          { key: "country", label: "Country", labelKey: "dashboardColumnCountry" },
          { key: "status", label: "Status", labelKey: "dashboardColumnStatus" },
        ]}
        rows={rows}
      />
    </>
  );
}
