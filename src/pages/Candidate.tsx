import { Link, useParams } from 'react-router-dom'
import { MAX_VOTES_PER_VOTER } from '../lib/types'

export default function Candidate() {
  const { slug } = useParams<{ slug: string }>()

  // TODO(worker): GET /api/candidates/:slug — 404 unless status='approved'.
  const candidate = null

  if (!candidate) {
    return (
      <div className="space-y-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Candidate not found</h1>
        <p className="text-ink-700">
          No approved candidate at <code className="text-sm">{slug}</code>.
        </p>
        <Link to="/candidates" className="inline-block underline underline-offset-2">
          Back to candidates
        </Link>
      </div>
    )
  }

  return (
    <article className="space-y-6">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-paper-alt">
        {/* TODO(r2): full-size photo_key. */}
      </div>

      {/* TODO(voting): first vote opens a modal collecting name, email and phone,
          passes Turnstile, then sets the browser token cookie. Subsequent votes
          reuse the cookie. The Worker is the authority on the limit — this button
          only reflects it. */}
      <button
        type="button"
        className="w-full rounded-full bg-blush-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blush-600"
      >
        Vote for this candidate
      </button>
      <p className="text-center text-xs text-ink-500">
        {MAX_VOTES_PER_VOTER} votes per person, one per candidate.
      </p>
    </article>
  )
}
