import { Liff } from '@line/liff'
import sleep from 'sleep-promise'

const clientSdk: Pick<Liff, 'init'> = {
  init: async () => {
    await sleep(1000)
  },
}

export default clientSdk
