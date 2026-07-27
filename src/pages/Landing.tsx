import { Link } from 'react-router-dom'
import hero from '../assets/hero.webp'

const NAV = [
  { to: '/candidates', label: 'Candidates' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/rules', label: 'Rules' },
]

export default function Landing() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      <img
        src={hero}
        alt=""
        width={2048}
        height={1536}
        // The photo is 4:3 but phones are ~9:19.5, so object-cover shows only
        // about a third of its width. Biasing left of centre keeps both subjects
        // in frame instead of cropping to just one.
        className="absolute inset-0 size-full object-cover object-[42%_28%]"
        fetchPriority="high"
      />

      {/* The headline sits centred over the photo, so it needs an even tint
          rather than an edge gradient — white text over unpredictable midtones
          is otherwise unreadable. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent"
      />

      <header className="absolute inset-x-0 top-0 z-10 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-white drop-shadow"
          >
            Clario
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3 py-1.5 text-white/85 transition-colors hover:bg-white/15 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* One link, two lines, centred in the viewport. */}
      <Link
        to="/apply"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center transition-opacity hover:opacity-85"
      >
        <span className="whitespace-nowrap text-[clamp(1.75rem,9vw,5rem)] font-semibold leading-[1.05] tracking-tight text-white drop-shadow-lg">
          Enter the contest
        </span>
        <span className="whitespace-nowrap text-[clamp(1.75rem,9vw,5rem)] font-semibold leading-[1.05] tracking-tight text-white drop-shadow-lg">
          Play the game
        </span>
      </Link>
    </div>
  )
}
