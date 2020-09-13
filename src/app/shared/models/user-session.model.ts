export default interface UserSession {
  id: string,
  name: string,
  firstName: string,
  email: string,
  accessToken: string,
  permissions?: string[]
}
