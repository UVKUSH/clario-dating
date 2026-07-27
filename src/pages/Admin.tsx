import { useState } from 'react'
import type { ApplicationStatus } from '../lib/types'

const TABS: { value: ApplicationStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

/**
 * Moderation queue.
 *
 * There is no login screen here on purpose. Cloudflare Access authenticates at
 * the edge before the request reaches Pages, and the Worker verifies the Access
 * JWT signature on every /api/admin/* call. The moderator's identity comes from
 * the JWT's email claim and is written to applications.reviewed_by.
 */
export default function Admin() {
  const [tab, setTab] = useState<ApplicationStatus>('pending')

  // TODO(worker): GET /api/admin/applications?status=<tab>
  const applications: never[] = []

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Moderation</h1>
        <p className="text-sm text-ink-500">
          Approving a candidate publishes their photo, first name and city.
        </p>
      </header>

      <div className="flex gap-1 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            className={[
              '-mb-px border-b-2 px-4 py-2 text-sm transition-colors',
              tab === t.value
                ? 'border-blush-500 font-medium text-ink-900'
                : 'border-transparent text-ink-500 hover:text-ink-700',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center text-sm text-ink-500">
          Nothing {tab}.
        </div>
      )}
    </div>
  )
}
