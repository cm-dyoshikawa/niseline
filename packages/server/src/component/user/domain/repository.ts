import { User } from './entity'

export interface UserRepository {
  find(id: string): Promise<User | undefined>
  findByAccessToken(accessToken: string): Promise<User | undefined>
  findByIdToken(idToken: string): Promise<User | undefined>
  create(user: User): Promise<void>
}
