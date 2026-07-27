import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-ink-700">That page doesn&rsquo;t exist.</p>
      <Link to="/" className="inline-block underline underline-offset-2">
        Go home
      </Link>
    </div>
  )
}
