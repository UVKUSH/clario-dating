import { Link } from 'react-router-dom'
import type { LeaderboardRow } from '../lib/types'

// TODO(worker): GET /api/candidates — approved rows only, paginated.
const candidates: LeaderboardRow[] = []

export default function Candidates() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Candidates</h1>
        <p className="text-ink-700">
          Everyone here has been reviewed and approved. You get three votes,
          one per candidate.
        </p>
      </header>

      {candidates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center">
          <p className="font-medium">No candidates yet</p>
          <p className="mt-1 text-sm text-ink-500">
            Applications are still being reviewed. Check back soon.
          </p>
          <Link
            to="/apply"
            className="mt-4 inline-block rounded-full bg-blush-500 px-5 py-2.5 text-sm font-medium text-white"
          >
            Apply
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {candidates.map((c) => (
            <li key={c.id}>
              <Link to={`/candidate/${c.public_slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-paper-alt">
                  {/* TODO(r2): serve thumb_key through the Worker or a public R2 domain. */}
                </div>
                <p className="mt-2 font-medium">{c.first_name}</p>
                {c.city && <p className="text-sm text-ink-500">{c.city}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
