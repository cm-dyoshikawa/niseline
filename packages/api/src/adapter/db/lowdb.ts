import * as fs from 'fs-extra'

export const initLowDb = () => {
  fs.mkdirpSync('./tmp')
  fs.writeFileSync('./tmp/users.json', JSON.stringify({}))
}
