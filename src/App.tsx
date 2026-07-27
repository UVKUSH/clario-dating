import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Apply from './pages/Apply'
import Submitted from './pages/Submitted'
import Candidates from './pages/Candidates'
import Candidate from './pages/Candidate'
import Leaderboard from './pages/Leaderboard'
import Rules from './pages/Rules'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/submitted" element={<Submitted />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate/:slug" element={<Candidate />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rules" element={<Rules />} />
        {/* Cloudflare Access guards this at the edge — the app renders no auth UI. */}
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
