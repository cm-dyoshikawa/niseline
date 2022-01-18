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
    }
    const user = await loginUseCase(body.userId)
    if (user instanceof UserNotFoundError) {
      reply.redirect(302, '/niseline/authorize')
      return
    }

    const url = new URL(clientEndpoint)
    url.search = new URLSearchParams({
      userId: user.id,
    }).toString()
    reply.redirect(302, url.toString())
  }
