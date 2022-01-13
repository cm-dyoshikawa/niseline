import { User } from './entity'

export interface UserRepository {
  findUser(id: string): Promise<User | undefined>
}
