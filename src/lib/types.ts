/**
 * Shapes returned by the Worker API. These mirror migrations/0001_init.sql —
 * if you change the schema, change these too.
 */

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

/** A publicly visible candidate. Never carries email or phone — those stay
 *  server-side and are only readable through the Access-protected admin API. */
export interface Candidate {
  id: string
  public_slug: string
  first_name: string
  city: string | null
  bio: string | null
  social_username: string | null
  application_answer: string | null
  photo_key: string | null
  vote_count: number
}

/** One row of the `leaderboard` view. */
export interface LeaderboardRow {
  id: string
  public_slug: string
  first_name: string
  city: string | null
  thumb_key: string | null
  vote_count: number
}

/** What /apply collects. The photo is sent as multipart, not JSON. */
export interface ApplicationInput {
  first_name: string
  last_name: string
  email: string
  phone: string
  age: number
  city: string
  social_username: string
  bio: string
  application_answer: string
}

/** Collected once, on a voter's first vote. */
export interface VoterInput {
  first_name: string
  last_name: string
  email: string
  phone: string
}

/** Voting rules. The Worker enforces these — the client copy exists only so the
 *  UI can show remaining votes. Never trust these numbers for authorization. */
export const MAX_VOTES_PER_VOTER = 3
export const MAX_VOTES_PER_CANDIDATE = 1

/** Image constraints, applied client-side before upload. */
export const IMAGE_MAX_WIDTH = 1080
export const IMAGE_MAX_HEIGHT = 1350
export const IMAGE_TARGET_BYTES = 500 * 1024
export const IMAGE_HARD_LIMIT_BYTES = 1024 * 1024
