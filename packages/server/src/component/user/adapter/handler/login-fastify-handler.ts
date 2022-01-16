import { RouteHandlerMethod } from 'fastify'
import { v4 as uuidV4 } from 'uuid'

export const buildLoginFastifyHandler =
  ({ clientEndpoint }: { clientEndpoint: string }): RouteHandlerMethod =>
  async (request, reply) => {
    const body = request.body as {
      userId: string
      state: string
    }
    const url = new URL(clientEndpoint)
    const code = uuidV4()
    url.search = new URLSearchParams({
      code,
      state: body.state,
    }).toString()
    reply.redirect(302, clientEndpoint)
  }
