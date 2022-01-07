import { Low, JSONFile } from 'lowdb'
import fs from 'fs-extra'

type Id = string

interface UserRecord {
  name: string
  picture: string
  email: string
}

type UserRecords = Record<Id, UserRecord>

export interface DbData {
  users: UserRecords
}

const initialDbData: DbData = { users: {} }

export interface Db {
  init(): Promise<void>
  write(newData: DbData): Promise<void>
  read(): Promise<DbData>
}

export class LowDb implements Db {
  lowdb: Low<DbData>

  constructor() {
    const file = './tmp/db.json'
    const adapter = new JSONFile<DbData>(file)
    this.lowdb = new Low(adapter)
  }

  async init(): Promise<void> {
    await this.lowdb.read()

    if (this.lowdb.data == null) {
      fs.mkdirpSync('./tmp')
      this.lowdb.data = initialDbData
      await this.lowdb.write()
    }
  }

  async write(newData: DbData): Promise<void> {
    this.lowdb.data = newData
    await this.lowdb.write()
  }

  async read(): Promise<DbData> {
    await this.lowdb.read()
    return this.lowdb.data!
  }
}
