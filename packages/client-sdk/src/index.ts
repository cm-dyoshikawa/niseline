/* eslint-disable no-console */

import { Liff } from '@line/liff'
import sleep from 'sleep-promise'
import { ConsoleLogger, Logger } from './logger'

const logger: Logger = new ConsoleLogger()

const clientSdk: Pick<Liff, 'init'> = {
  init: async () => {
    logger.info('init')
    await sleep(1000)
  },
}

export default clientSdk
