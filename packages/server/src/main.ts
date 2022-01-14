/* eslint-disable camelcase */
import Fastify, { RouteHandlerMethod } from 'fastify'
import fastifyFormBody from 'fastify-formbody'
import { bootstrap } from './di/bootstrap'
import { DI_TYPE } from './di/type'
import { initLowDb } from './util/db/lowdb'

const fastify = Fastify({
  logger: true,
})
fastify.register(fastifyFormBody)

const container = bootstrap()

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
 * Login API
 */
fastify.get(
  '/oauth2/v2.1/verify',
  container.get<RouteHandlerMethod>(DI_TYPE.VERIFY_ACCESS_TOKEN_FASTIFY_HANDLER)
)
fastify.post(
  '/oauth2/v2.1/verify',
  container.get<RouteHandlerMethod>(DI_TYPE.VERIFY_ID_TOKEN_FASTIFY_HANDLER)
)
fastify.get(
  '/v2/profile',
  container.get<RouteHandlerMethod>(DI_TYPE.GET_USER_PROFILE_FASTIFY_HANDLER)
)
fastify.get(
  '/friendship/v1/status',
  container.get<RouteHandlerMethod>(
    DI_TYPE.GET_FRIENDSHIP_STATUS_FASTIFY_HANDLER
  )
)

/**
 * Messaging API
 */
fastify.post(
  '/v2/bot/message/reply',
  container.get<RouteHandlerMethod>(DI_TYPE.SEND_REPLY_MESSAGE_FASTIFY_HANDLER)
)
fastify.post(
  '/v2/bot/message/push',
  container.get<RouteHandlerMethod>(DI_TYPE.SEND_PUSH_MESSAGE_FASTIFY_HANDLER)
)

initLowDb()

fastify.listen(3000, '0.0.0.0', (err) => {
  if (err) throw err
})
