import { RouteHandlerMethod } from 'fastify'

export const buildAuthorizeFastifyHandler =
  (): RouteHandlerMethod => async (_, reply) => {
    reply.view('/template/authorize.ejs')
  }
