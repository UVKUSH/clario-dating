import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/candidates', label: 'Candidates' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/rules', label: 'Rules' },
]

export default function Layout() {
  const { pathname } = useLocation()

  // The landing page is a full-bleed photo and renders its own overlaid bar,
  // so it takes the viewport without this layout's header, padding or footer.
  if (pathname === '/') {
    return <Outlet />
  }

  // The moderation dashboard is not part of the public site's chrome.
  if (pathname.startsWith('/admin')) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Clario
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3 py-1.5 transition-colors',
                    isActive
                      ? 'bg-blush-50 text-blush-600'
                      : 'text-ink-700 hover:text-ink-900',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-line px-4 py-6 text-center text-xs text-ink-500">
        <Link to="/rules" className="underline underline-offset-2">
          Eligibility, privacy &amp; voting rules
        </Link>
      </footer>
    </div>
  )
}
