/* eslint-disable no-console */

import { Liff } from '@line/liff'
import { buildGetAccessToken } from './method/get-access-token'
import { buildGetIdToken } from './method/get-id-token'
import { buildInit } from './method/init'
import { ConsoleLogger, Logger } from './util/logger'

const logger: Logger = new ConsoleLogger()
const clientEndpoint = window.location.origin
const authEndpoint = 'http://localhost:3000'

export const buildClientSdk = (): Pick<
  Liff,
  'init' | 'getAccessToken' | 'getIDToken'
> => ({
  init: buildInit({ logger, clientEndpoint, authEndpoint }),
  getAccessToken: buildGetAccessToken(),
  getIDToken: buildGetIdToken(),
})
