import { Link } from 'react-router-dom'
import type { LeaderboardRow } from '../lib/types'

// TODO(worker): GET /api/leaderboard — reads the `leaderboard` view in D1.
const rows: LeaderboardRow[] = []

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Leaderboard</h1>
        <p className="text-ink-700">
          Public votes decide the finalists. Clairo and her team choose the winner.
        </p>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center">
          <p className="font-medium">No votes yet</p>
          <p className="mt-1 text-sm text-ink-500">
            Rankings appear once voting opens.
          </p>
        </div>
      ) : (
        <ol className="divide-y divide-line">
          {rows.map((row, i) => (
            <li key={row.id}>
              <Link
                to={`/candidate/${row.public_slug}`}
                className="flex items-center gap-4 py-3"
              >
                <span className="w-6 shrink-0 text-sm tabular-nums text-ink-500">
                  {i + 1}
                </span>
                <div className="size-12 shrink-0 overflow-hidden rounded-full bg-paper-alt" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{row.first_name}</p>
                  {row.city && (
                    <p className="truncate text-sm text-ink-500">{row.city}</p>
                  )}
                </div>
                <span className="shrink-0 text-sm tabular-nums font-medium">
                  {row.vote_count}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
