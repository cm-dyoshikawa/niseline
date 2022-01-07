import { User } from '../../core/user/domain/entity'
import { UserRepository } from '../../core/user/domain/repository'
import { JSONFile, Low } from 'lowdb'

export interface UserRecord {
  name: string
  picture: string
  email: string
}

const toUserRecord = (user: User): UserRecord => {
  return {
    name: user.name,
    picture: user.picture,
    email: user.email,
  }
}

const toUser = (id: string, userRecord: UserRecord): User => {
  return {
    ...userRecord,
    id: id,
  }
}

type UserJson = Record<string, UserRecord>

export class UserLowRepository implements UserRepository {
  private readonly low: Low<UserJson>

  constructor() {
    const file = './tmp/users.json'
    const adapter = new JSONFile<UserJson>(file)
    this.low = new Low(adapter)
  }

  async find(id: string): Promise<User | undefined> {
    await this.low.read()
    const userRecord: UserRecord | undefined = this.low.data?.[id]
    if (userRecord == null) {
      return undefined
    }

    return toUser(id, userRecord)
  }

  async create(user: User): Promise<void> {
    await this.low.read()
    this.low.data![user.id] = toUserRecord(user)
    await this.low.write()
  }
}
