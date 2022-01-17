import liff from '@line/liff'
import { v4 as uuidV4 } from 'uuid'
import { Logger } from '../util/logger'

export const buildInit =
  ({
    logger,
    clientEndpoint,
    authEndpoint,
  }: {
    logger: Logger
    clientEndpoint: string
    authEndpoint: string
  }): typeof liff.init =>
  async (config): ReturnType<typeof liff.init> => {
    logger.info('Init start')

    /**
     * Check exists tokens
     */
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    const idToken = localStorage.getItem('ID_TOKEN')
    if (accessToken != null && idToken != null) {
      logger.info('Exists tokens')

      const fetchMeResult = await fetch(
        new URL('/niseline/users/me/_accessToken', authEndpoint).toString(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      if (!fetchMeResult.ok) {
        logger.error(
          'Invalid response from GET /niseline/users/me/_accessToken'
        )
        return
      }

      const fetchMeResponseBody = await fetchMeResult.json()
      localStorage.setItem('MY_USER', JSON.stringify(fetchMeResponseBody))
      logger.info('Get and set my user info successfully')
      return
    }

    logger.info('Not exists tokens')

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
      const result = await fetch(
        new URL('/niseline/token', authEndpoint).toString(),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grantType: 'authorization_code',
            redirectUri: clientEndpoint,
            code: authorizationCode,
          }),
        }
      )
      if (!result.ok) {
        logger.error('Invalid response from POST /niseline/token')
        return
      }

      const json: { accessToken: string; idToken: string } = await result.json()
      localStorage.setItem('ACCESS_TOKEN', json.accessToken)
      localStorage.setItem('ID_TOKEN', json.idToken)
      logger.info('Get and set tokens successfully')
      window.location.reload()
      return
    }

    /**
     * Start authorization flow
     */
    const newState = uuidV4()
    localStorage.setItem('STATE', newState)
    const url = new URL('/niseline/authorize', authEndpoint)
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: config.liffId,
      scope: 'default',
      redirect_uri: clientEndpoint,
      state: newState,
    }).toString()
    window.location.href = url.toString()
  }
