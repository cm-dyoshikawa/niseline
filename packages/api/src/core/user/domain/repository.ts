import { User } from './entity'

export interface UserRepository {
  //   findAll()
  find(id: string): Promise<User | undefined>
  create(user: User): Promise<void>
}
