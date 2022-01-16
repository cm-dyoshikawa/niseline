import { RouteHandlerMethod } from 'fastify'

export const buildAuthorizeFastifyHandler =
  (): RouteHandlerMethod => async (request, reply) => {
    const query = request.query as {
      state: string
    }
    reply.view('/template/authorize.ejs', { state: query.state })
  }
