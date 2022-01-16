/* eslint-disable no-console */

import { Liff } from '@line/liff'
import { buildGetAccessToken } from './method/get-access-token'
import { buildGetIdToken } from './method/get-id-token'
import { buildGetLanguage } from './method/get-language'
import { buildGetLineVersion } from './method/get-line-version'
import { buildGetOs } from './method/get-os'
import { buildGetVersion } from './method/get-version'
import { buildInit } from './method/init'
import { buildIsInClient } from './method/is-in-client'
import { buildIsLoggedIn } from './method/is-logged-in'
import { buildLogout } from './method/logout'
import { ConsoleLogger, Logger } from './util/logger'

export const buildClientSdk = (params?: {
  clientEndpoint?: string
  authEndpoint?: string
  os?: 'ios' | 'android' | 'web' | undefined
  language?: string
  version?: string
  lineVersion?: string
  isInClient?: boolean
}): Pick<
  Liff,
  | 'init'
  | 'getOS'
  | 'getLanguage'
  | 'getVersion'
  | 'getLineVersion'
  | 'isInClient'
  | 'isLoggedIn'
  | 'logout'
  | 'getAccessToken'
  | 'getIDToken'
> => {
  const logger: Logger = new ConsoleLogger()
  const clientEndpoint = params?.clientEndpoint ?? window.location.origin
  const authEndpoint = params?.authEndpoint ?? 'http://localhost:3000'
  const os = params?.os ?? 'web'
  const language = params?.language ?? 'ja'
  const version = params?.version ?? '2.16.1'
  const lineVersion = params?.lineVersion ?? '1.0.0'
  const isInClient = params?.isInClient ?? false

  return {
    init: buildInit({ logger, clientEndpoint, authEndpoint }),
    getOS: buildGetOs(os),
    getLanguage: buildGetLanguage(language),
    getVersion: buildGetVersion(version),
    getLineVersion: buildGetLineVersion(lineVersion),
    isInClient: buildIsInClient(isInClient),
    isLoggedIn: buildIsLoggedIn(),
    logout: buildLogout(),
    getAccessToken: buildGetAccessToken(),
    getIDToken: buildGetIdToken(),
  }
}
