import { Link } from 'react-router-dom'

export default function Submitted() {
  return (
    <div className="space-y-6 py-10 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-blush-50 text-2xl">
        ✓
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Application received
        </h1>
        <p className="mx-auto max-w-prose text-ink-700">
          A moderator will review it before it appears publicly. You won&rsquo;t
          show up on the candidates page until then.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/candidates"
          className="rounded-full bg-blush-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blush-600"
        >
          Browse candidates
        </Link>
        <Link
          to="/rules"
          className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:bg-paper-alt"
        >
          Read the rules
        </Link>
      </div>
    </div>
  )
}
