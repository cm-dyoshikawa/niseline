/* eslint-disable camelcase */
import Fastify, { RouteHandlerMethod } from 'fastify'
import fastifyFormBody from 'fastify-formbody'
import { bootstrap } from './di/bootstrap'
import { DI_TYPE } from './di/type'
import {
  ShowUserUseCase,
  UserNotFoundError,
} from './component/user/use-case/show-user-use-case'
import { initLowDb } from './util/db/lowdb'

const fastify = Fastify({
  logger: true,
})
fastify.register(fastifyFormBody)

const container = bootstrap()

interface ErrorResponseBody {
  error: string // 'invalid_request'
  error_description: string // 'access token expired'
}

/**
 * Debug
 */
fastify.get(
  '/debug/ping',
  container.get<RouteHandlerMethod>(DI_TYPE.DEBUG_PING_HANDLER)
)

fastify.post(
  '/debug/users',
  container.get<RouteHandlerMethod>(DI_TYPE.DEBUG_REGISTER_USER_HANDLER)
)

/**
 * Login
 */
/**
 * https://developers.line.biz/ja/reference/line-login/#verify-access-token
 */
interface VerifyAccessTokenRequestQuery {
  access_token: string
}

interface VerifyAccessTokenResponseBody {
  scope: string // 'profile'
  client_id: string // '1440057261'
  expires_in: number // 2591659
}

fastify.get('/oauth2/v2.1/verify', async (request, reply) => {
  const accessToken = (request.query as VerifyAccessTokenRequestQuery)
    .access_token

  const showUserUseCase = container.get<ShowUserUseCase>(
    DI_TYPE.SHOW_USER_USE_CASE
  )
  const showUserResult = await showUserUseCase(accessToken)

  if (showUserResult instanceof UserNotFoundError) {
    reply.type('application/json').code(400)
    return {
      error: 'invalid_request',
      error_description: 'access token expired',
    } as ErrorResponseBody
  }

  reply.type('application/json').code(200)
  return {
    scope: 'profile',
    client_id: '1440057261',
    expires_in: 2591659,
  } as VerifyAccessTokenResponseBody
})

/**
 * https://developers.line.biz/ja/reference/line-login/#verify-id-token
 */
interface VerifyIdTokenRequestBody {
  id_token: string
  client_id: string
}

interface VerifyIdTokenResponseBody {
  iss: string // 'https://access.line.me'
  sub: string // 'U1234567890abcdef1234567890abcdef'
  aud: string // '1234567890'
  exp: number // 1504169092
  iat: number // 1504263657
  nonce: string // '0987654asdf'
  amr: ReadonlyArray<string> // ['pwd']
  name: string // 'Taro Line'
  picture: string // 'https://sample_line.me/aBcdefg123456'
  email: string // 'taro.line@example.com'
}

fastify.post('/oauth2/v2.1/verify', async (request, reply) => {
  const idToken = (request.body as VerifyIdTokenRequestBody).id_token

  const showUserUseCase = container.get<ShowUserUseCase>(
    DI_TYPE.SHOW_USER_USE_CASE
  )
  const showUserResult = await showUserUseCase(idToken)

  if (showUserResult instanceof UserNotFoundError) {
    reply.type('application/json').code(400)
    return {
      error: 'invalid_request',
      error_description: 'Invalid IdToken.',
    } as ErrorResponseBody
  }

  reply.type('application/json').code(200)
  return {
    iss: 'https://example.com',
    sub: showUserResult.id,
    aud: '1234567890',
    exp: 1504169092,
    iat: 1504263657,
    nonce: '0987654asdf',
    amr: ['pwd'],
    name: showUserResult.name,
    picture: showUserResult.picture,
    email: showUserResult.email,
  } as VerifyIdTokenResponseBody
})

/**
 * https://developers.line.biz/ja/reference/line-login/#get-user-profile
 */
interface GetUserProfileResponseBody {
  userId: string // 'U4af4980629...'
  displayName: string // 'Brown'
  pictureUrl: string // 'https://profile.line-scdn.net/abcdefghijklmn'
  statusMessage: string // 'Hello, LINE!'
}

fastify.get('/v2/profile', async (request, reply) => {
  const [, accessToken] = request.headers.authorization!.split(' ')

  const showUserUseCase = container.get<ShowUserUseCase>(
    DI_TYPE.SHOW_USER_USE_CASE
  )
  const showUserResult = await showUserUseCase(accessToken)

  if (showUserResult instanceof UserNotFoundError) {
    reply.type('application/json').code(400)
    return {
      error: 'invalid_request',
      error_description: 'access token expired',
    } as ErrorResponseBody
  }

  reply.type('application/json').code(200)
  return {
    userId: showUserResult.id,
    displayName: 'Brown',
    pictureUrl: showUserResult.picture,
    statusMessage: 'Hello, Linely!',
  } as GetUserProfileResponseBody
})

/**
 * https://developers.line.biz/ja/reference/line-login/#get-user-profile
 */
interface GetFriendshipStatus {
  friendFlag: boolean
}

fastify.get('/friendship/v1/status', async (request, reply) => {
  const [, accessToken] = request.headers.authorization!.split(' ')

  const showUserUseCase = container.get<ShowUserUseCase>(
    DI_TYPE.SHOW_USER_USE_CASE
  )
  const showUserResult = await showUserUseCase(accessToken)
  if (showUserResult instanceof UserNotFoundError) {
    reply.type('application/json').code(400)
    return {
      error: 'invalid_request',
      error_description: 'access token expired',
    } as ErrorResponseBody
  }

  reply.type('application/json').code(200)
  return {
    friendFlag: true,
  } as GetFriendshipStatus
})

initLowDb()

fastify.listen(3000, '0.0.0.0', (err) => {
  if (err) throw err
})
