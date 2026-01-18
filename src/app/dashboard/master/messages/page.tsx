"use client";

import { STORAGE_KEYS } from "@/lib/igatesData";
import { useFirebaseStorage } from "@/lib/useFirebaseStorage";
import type { ContactRequest } from "@/lib/types";

export default function MasterMessagesPage() {
  const [contactRequests] = useFirebaseStorage<ContactRequest[]>(STORAGE_KEYS.contactRequests, []);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Advisory requests</h2>
            <p className="text-xs text-slate-500">Messages received from the contact form.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {contactRequests.length} requests
          </span>
        </div>
        <div className="mt-6">
          {contactRequests.length ? (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                    <th className="px-4 py-3 font-semibold">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {contactRequests.map((request) => (
                    <tr key={request.id} className="bg-white">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                        {request.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{request.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{request.phone}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {request.message}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {request.receivedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
              No advisory requests yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
