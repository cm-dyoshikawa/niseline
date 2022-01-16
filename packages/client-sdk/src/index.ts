/* eslint-disable no-console */

import { Liff } from '@line/liff'
import { ConsoleLogger, Logger } from './logger'

const logger: Logger = new ConsoleLogger()
const authEndpoint = 'http://localhost:3000'

const clientSdk: Pick<Liff, 'init'> = {
  init: async () => {
    logger.info('init')

    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const idToken = localStorage.getItem('ID_TOKEN')
    if (accessToken != null) {
      // TODO
    } else if (idToken != null) {
      // TODO
    } else {
      window.location.href = new URL(
        '/linely/authorize',
        authEndpoint
      ).toString()
    }
  },
}

export default clientSdk
