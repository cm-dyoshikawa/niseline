import { User } from '../../core/user/domain/entity'
import { UserRepository } from '../../core/user/domain/repository'
import { Db } from '../db'

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

export class UserRepositoryImpl implements UserRepository {
  private readonly db: Db

  constructor(db: Db) {
    this.db = db
  }

  async find(id: string): Promise<User | Error> {
    const data = await this.db.read()
    const userRecord = data.users[id]

    // TODO Userがundefinedだった場合

    return toUser(id, userRecord)
  }

  async create(user: User): Promise<void> {
    const data = await this.db.read()
    data.users[user.id] = toUserRecord(user)
    await this.db.write(data)
  }
}
