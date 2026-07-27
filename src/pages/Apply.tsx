import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGE_HARD_LIMIT_BYTES } from '../lib/types'

const FIELDS = [
  { name: 'first_name', label: 'First name', type: 'text', autoComplete: 'given-name', required: true },
  { name: 'last_name', label: 'Last name', type: 'text', autoComplete: 'family-name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'age', label: 'Age', type: 'number', autoComplete: 'off', required: true },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2', required: false },
  { name: 'social_username', label: 'Social username', type: 'text', autoComplete: 'off', required: false },
] as const

export default function Apply() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = new FormData(event.currentTarget)

    // TODO(worker): downscale to 1080x1350 and re-encode to WebP under ~500KB
    // before attaching. Doing it client-side keeps large originals off the wire.
    const photo = form.get('photo')
    if (photo instanceof File && photo.size > IMAGE_HARD_LIMIT_BYTES) {
      setError('That photo is over 1 MB. Please choose a smaller one.')
      setSubmitting(false)
      return
    }

    // TODO(worker): attach the Turnstile token, then POST to /api/applications.
    // The Worker writes the row to D1 and the image to R2 with status='pending'.
    try {
      navigate('/submitted')
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Apply</h1>
        <p className="text-ink-700">
          You must be 18 or older. Nothing appears publicly until a moderator
          approves it.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
        {FIELDS.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <label htmlFor={field.name} className="block text-sm font-medium">
              {field.label}
              {!field.required && (
                <span className="ml-1 font-normal text-ink-500">(optional)</span>
              )}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              {...(field.name === 'age' ? { min: 18, max: 120 } : {})}
              className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-base"
            />
          </div>
        ))}

        <div className="space-y-1.5">
          <label htmlFor="bio" className="block text-sm font-medium">
            Short bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={300}
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-base"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="application_answer" className="block text-sm font-medium">
            Why you?
          </label>
          <textarea
            id="application_answer"
            name="application_answer"
            rows={5}
            maxLength={1000}
            required
            className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-base"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="photo" className="block text-sm font-medium">
            Photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            required
            className="w-full text-sm text-ink-700 file:mr-3 file:rounded-full file:border-0 file:bg-paper-alt file:px-4 file:py-2 file:text-sm file:font-medium"
          />
          <p className="text-xs text-ink-500">
            One photo, up to 1 MB. It will be resized and converted automatically.
          </p>
        </div>

        {/* TODO(turnstile): mount the Turnstile widget here and pass its token
            with the request. The site key is public; the secret key stays in the
            Worker and must never be exposed as a VITE_ variable. */}
        <div className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-ink-500">
          Turnstile widget mounts here
        </div>

        {error && (
          <p role="alert" className="text-sm text-blush-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-blush-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blush-600 disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Submit application'}
        </button>
      </form>
    </div>
  )
}
