import { MAX_VOTES_PER_VOTER } from '../lib/types'

const SECTIONS = [
  {
    heading: 'Eligibility',
    items: [
      'You must be 18 or older to apply.',
      'One application per person.',
      'Applications are reviewed before appearing publicly. A moderator may decline any application.',
    ],
  },
  {
    heading: 'Voting',
    items: [
      `${MAX_VOTES_PER_VOTER} votes per person.`,
      'One vote per candidate — you cannot stack votes on one person.',
      'Public votes determine the finalists. Clairo and her team choose the final winner.',
      'Votes found to be automated or duplicated may be removed.',
    ],
  },
  {
    heading: 'Privacy',
    items: [
      'Applicants provide a name, email, phone number and one photo.',
      'Only a first name, city and photo are shown publicly once approved. Email and phone are never published.',
      'Voters provide a name, email and phone number on their first vote.',
      'We store a hashed browser token and a hashed IP address to limit duplicate voting. Raw IP addresses are not stored.',
      'Email addresses and phone numbers are not verified, so they should not be treated as confirmed identity.',
    ],
  },
]

export default function Rules() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Rules</h1>

      {SECTIONS.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink-500">
            {section.heading}
          </h2>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item} className="flex gap-3 text-ink-700">
                <span aria-hidden="true" className="text-ink-500">
                  &bull;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* TODO(legal): have the privacy wording reviewed before launch — this
          collects contact details and photos from the public. */}
    </div>
  )
}
