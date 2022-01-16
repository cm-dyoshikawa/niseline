import { RouteHandlerMethod } from 'fastify'
import { LoginUseCase, UserNotFoundError } from '../../use-case/login-use-case'

export const buildLoginFastifyHandler =
  ({
    clientEndpoint,
    loginUseCase,
  }: {
    clientEndpoint: string
    loginUseCase: LoginUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const body = request.body as {
      userId: string
      state: string
    }
    const url = new URL(clientEndpoint)
    const authorizationCode = await loginUseCase(body.userId)
    if (authorizationCode instanceof UserNotFoundError) {
      reply.redirect(302, '/linely/authorize')
      return
    }

    url.search = new URLSearchParams({
      code: authorizationCode,
      state: body.state,
    }).toString()
    reply.redirect(302, clientEndpoint)
  }
