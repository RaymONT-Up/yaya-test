export interface CurrentSessionState {
  user_id: string | null
  token: string | null
  username: string | null
  loading: boolean
  error: string | null
}
