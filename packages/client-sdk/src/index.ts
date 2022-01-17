/* eslint-disable no-console */

import { Liff } from '@line/liff'
import { buildCloseWindow } from './method/close-window'
import { buildGetAccessToken } from './method/get-access-token'
import { buildGetContext } from './method/get-context'
import { buildGetDecodedIdToken } from './method/get-decoded-id-token'
import { buildGetFriendship } from './method/get-friendship'
import { buildGetIdToken } from './method/get-id-token'
import { buildGetLanguage } from './method/get-language'
import { buildGetLineVersion } from './method/get-line-version'
import { buildGetOs } from './method/get-os'
import { buildGetProfile } from './method/get-profile'
import { buildGetVersion } from './method/get-version'
import { buildInit } from './method/init'
import { buildIsApiAvailable } from './method/is-api-available'
import { buildIsInClient } from './method/is-in-client'
import { buildIsLoggedIn } from './method/is-logged-in'
import { buildLogin } from './method/login'
import { buildLogout } from './method/logout'
import { buildSendMessages } from './method/send-messages'
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
  | 'isApiAvailable'
  | 'login'
  | 'logout'
  | 'getAccessToken'
  | 'getIDToken'
  | 'getDecodedIDToken'
  | 'getContext'
  | 'getProfile'
  | 'getFriendship'
  | 'sendMessages'
  | 'closeWindow'
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
    isApiAvailable: buildIsApiAvailable(),
    login: buildLogin(),
    getDecodedIDToken: buildGetDecodedIdToken(),
    getContext: buildGetContext(),
    getProfile: buildGetProfile(),
    getFriendship: buildGetFriendship(),
    sendMessages: buildSendMessages(),
    closeWindow: buildCloseWindow(),
  }
}
