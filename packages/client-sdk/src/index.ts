/* eslint-disable no-console */

import { Liff } from '@line/liff'
import { v4 as uuidV4 } from 'uuid'
import { ConsoleLogger, Logger } from './logger'

const logger: Logger = new ConsoleLogger()
const clientEndpoint = 'https://localhost:3001'
const authEndpoint = 'http://localhost:3000'

const clientSdk: Pick<Liff, 'init'> = {
  init: async (config) => {
    logger.info('init start')

    /**
     * Check state and authorization code
     */
    const urlSearchParams = new URLSearchParams(window.location.search)
    const authorizationCode = urlSearchParams.get('code')
    const state = urlSearchParams.get('state')
    if (authorizationCode != null && state != null) {
      if (state !== localStorage.getItem('STATE')) {
        logger.error('Invalid state value')
        return
      }

      logger.info('Valid state value')
      return
    }

    /**
     * Start authorization flow
     */
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const idToken = localStorage.getItem('ID_TOKEN')
    if (accessToken != null) {
      // TODO
    } else if (idToken != null) {
      // TODO
    } else {
      const newState = uuidV4()
      localStorage.setItem('STATE', newState)
      const url = new URL('/linely/authorize', authEndpoint)
      url.search = new URLSearchParams({
        response_type: 'code',
        client_id: config.liffId,
        scope: 'default',
        redirect_uri: clientEndpoint,
        state: newState,
      }).toString()
      window.location.href = url.toString()
    }
  },
}

export default clientSdk
