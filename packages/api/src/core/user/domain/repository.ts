import { User } from './entity'

export interface UserRepository {
  //   findAll()
  find(id: string): Promise<User | Error>
  create(user: User): Promise<void>
}
