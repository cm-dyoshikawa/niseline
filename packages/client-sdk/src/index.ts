/* eslint-disable no-console */
import { Liff } from '@line/liff'
import sleep from 'sleep-promise'

const clientSdk: Pick<Liff, 'init'> = {
  init: async () => {
    console.log('@linely/client-sdk: init')
    await sleep(1000)
  },
}

export default clientSdk
