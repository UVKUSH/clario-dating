import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="space-y-10">
      <section className="space-y-4 pt-6">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-balance">
          Apply to be Clairo&rsquo;s date.
        </h1>
        <p className="max-w-prose text-ink-700">
          Tell us who you are. Applications are reviewed before anyone appears
          publicly, and the community votes on who makes the shortlist.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/apply"
            className="rounded-full bg-blush-500 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blush-600"
          >
            Apply now
          </Link>
          <Link
            to="/candidates"
            className="rounded-full border border-line px-6 py-3 text-center font-medium text-ink-900 transition-colors hover:bg-paper-alt"
          >
            Browse candidates
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink-500">
          How it works
        </h2>
        <ol className="space-y-3">
          {[
            'Submit your application with one photo.',
            'A moderator reviews it before it goes public.',
            'Visitors vote — three votes each, one per candidate.',
            'Public votes decide the finalists. Clairo and her team choose the winner.',
          ].map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blush-50 text-xs font-medium text-blush-600">
                {i + 1}
              </span>
              <span className="text-ink-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
