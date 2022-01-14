import * as fs from 'fs-extra'
import { UserJson } from '../../component/user/adapter/repository/user-repository'

export const initLowDb = () => {
  fs.mkdirpSync('./tmp')

  const channelJson = [
    {
      id: 'DEFAULT_CHANNEL',
      secret: 'DEFAULT_CHANNEL_SECRET',
      accessToken: 'DEFAULT_CHANNEL_ACCESS_TOKEN',
    },
  ]
  fs.writeFileSync('./tmp/channels.json', JSON.stringify(channelJson, null, 2))

  const userJson: UserJson = {
    DEFAULT_USER: {
      name: 'Default User',
      picture: 'https://example.com',
      email: 'default@example.com',
      channelId: 'DEFAULT_CHANNEL',
    },
  }
  fs.writeFileSync('./tmp/users.json', JSON.stringify(userJson, null, 2))
}
