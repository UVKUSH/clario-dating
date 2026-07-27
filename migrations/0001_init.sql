-- Clario — initial schema
-- D1 is SQLite. IDs are TEXT (UUIDv4 generated in the Worker via crypto.randomUUID()).
-- Timestamps are ISO-8601 UTC strings so they sort lexicographically.

PRAGMA foreign_keys = ON;

-- There is deliberately no `admins` table. /admin sits behind Cloudflare Access,
-- which owns the allowlist and authenticates at the edge. The moderator's identity
-- arrives in the Access JWT (the `email` claim, mirrored in the
-- Cf-Access-Authenticated-User-Email header), so there is no password to store,
-- no session to manage, and no reset flow to get wrong.
--
-- The Worker MUST still verify the JWT signature against the team's public keys.
-- The header alone is trivially forged by anything that reaches the Worker directly.

-- ---------------------------------------------------------------------------
-- applications — one row per applicant, public only once status='approved'
-- ---------------------------------------------------------------------------
CREATE TABLE applications (
  id                 TEXT PRIMARY KEY,
  first_name         TEXT NOT NULL,
  last_name          TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  age                INTEGER NOT NULL CHECK (age >= 18),
  city               TEXT,
  photo_key          TEXT,              -- R2 key: full-size approved image
  thumb_key          TEXT,              -- R2 key: leaderboard thumbnail
  social_username    TEXT,
  bio                TEXT,
  application_answer TEXT,
  status             TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending', 'approved', 'rejected')),
  public_slug        TEXT UNIQUE,       -- NULL until approved; drives /candidate/:slug
  created_at         TEXT NOT NULL DEFAULT (datetime('now')),

  -- moderation audit trail: who acted on this and when.
  -- reviewed_by is the verified email claim from the Cloudflare Access JWT.
  reviewed_at        TEXT,
  reviewed_by        TEXT
);

-- /candidates and /leaderboard both filter on status; this keeps them off a scan.
CREATE INDEX idx_applications_status_created ON applications (status, created_at DESC);

-- Duplicate-applicant checks at submit time.
CREATE INDEX idx_applications_email ON applications (email);
CREATE INDEX idx_applications_phone ON applications (phone);

-- ---------------------------------------------------------------------------
-- voters — created on first vote, identified thereafter by browser token
-- ---------------------------------------------------------------------------
CREATE TABLE voters (
  id                 TEXT PRIMARY KEY,
  first_name         TEXT NOT NULL,
  last_name          TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  browser_token_hash TEXT NOT NULL UNIQUE,  -- SHA-256 of the cookie value, never the raw token
  ip_hash            TEXT,                  -- salted hash, for rate limiting only
  created_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Soft duplicate detection (email/phone are unverified, so NOT unique — a collision
-- is a signal for the admin queue, not something to hard-reject at the DB layer).
CREATE INDEX idx_voters_email   ON voters (email);
CREATE INDEX idx_voters_phone   ON voters (phone);
CREATE INDEX idx_voters_ip_hash ON voters (ip_hash);

-- ---------------------------------------------------------------------------
-- votes
-- ---------------------------------------------------------------------------
CREATE TABLE votes (
  id             TEXT PRIMARY KEY,
  voter_id       TEXT NOT NULL REFERENCES voters(id)       ON DELETE CASCADE,
  application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),

  -- "One vote per candidate" enforced by the database, not just the Worker.
  UNIQUE (voter_id, application_id)
);

-- Leaderboard tallies group by application_id.
CREATE INDEX idx_votes_application ON votes (application_id);
-- "Three votes per person" is a COUNT(*) on this index before each insert.
CREATE INDEX idx_votes_voter       ON votes (voter_id);

-- ---------------------------------------------------------------------------
-- leaderboard — derived, not stored. A view cannot drift out of sync with votes.
-- ---------------------------------------------------------------------------
CREATE VIEW leaderboard AS
SELECT
  a.id,
  a.public_slug,
  a.first_name,
  a.city,
  a.thumb_key,
  COUNT(v.id) AS vote_count
FROM applications a
LEFT JOIN votes v ON v.application_id = a.id
WHERE a.status = 'approved'
GROUP BY a.id
ORDER BY vote_count DESC, a.created_at ASC;
