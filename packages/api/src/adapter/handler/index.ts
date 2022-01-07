import Fastify from 'fastify'
import fastifyFormBody from 'fastify-formbody'
import { bootstrap } from '../../di/bootstrap'
import { DI_TYPE } from '../../di/type'
import { RegisterUserUseCase } from '../../core/user/use-case/register-user-use-case'
import { Db } from '../db'
import {
  ShowUserUseCase,
  UserNotFoundError,
} from '../../core/user/use-case/show-user-use-case'

const fastify = Fastify({
  logger: true,
})
fastify.register(fastifyFormBody)

const container = bootstrap()

/**
 * Debug
 */
fastify.get('/debug/ping', async (_, reply) => {
  reply.type('application/json').code(200)
  return { ping: 'pong' }
})

fastify.post('/debug/users', async (request, reply) => {
  const registerUserUseCase = container.get<RegisterUserUseCase>(
    DI_TYPE.REGISTER_USER_USE_CASE
  )

  const body = request.body as {
    id: string
    name: string
    picture: string
    email: string
  }

  await registerUserUseCase({
    id: body.id,
    name: body.name,
    picture: body.picture,
    email: body.email,
  })

  reply.type('application/json').code(200)
  return null
})

/**
 * Login
 * https://developers.line.biz/ja/reference/line-login/#verify-id-token
 */
interface VerifyIdTokenResponse {
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

interface VerifyIdTokenRequest {
  // eslint-disable-next-line camelcase
  id_token: string
  // eslint-disable-next-line camelcase
  client_id: string
}

fastify.post('/oauth2/v2.1/verify', async (request, reply) => {
  const idToken = (request.body as VerifyIdTokenRequest).id_token

  const showUserUseCase = container.get<ShowUserUseCase>(
    DI_TYPE.SHOW_USER_USE_CASE
  )
  const showUserResult = await showUserUseCase(idToken)

  if (showUserResult instanceof UserNotFoundError) {
    reply.type('application/json').code(400)
    return {}
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
  } as VerifyIdTokenResponse
})

const db = container.get<Db>(DI_TYPE.DB)

db.init().then(() => {
  fastify.listen(3000, '0.0.0.0', (err) => {
    if (err) throw err
  })
})
