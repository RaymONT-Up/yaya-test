export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  user_id: string
  username: string
}
