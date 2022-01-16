import { RouteHandlerMethod } from 'fastify'
import { v4 as uuidV4 } from 'uuid'
import {
  FindUserUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-use-case'

export const buildLoginFastifyHandler =
  ({
    clientEndpoint,
    findUserUseCase,
  }: {
    clientEndpoint: string
    findUserUseCase: FindUserUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const body = request.body as {
      userId: string
      state: string
    }
    const url = new URL(clientEndpoint)
    const findUserUseCaseResult = await findUserUseCase(body.userId)
    if (findUserUseCaseResult instanceof UserNotFoundError) {
      reply.redirect(302, '/linely/authorize')
      return
    }

    const code = uuidV4()
    url.search = new URLSearchParams({
      code,
      state: body.state,
    }).toString()
    reply.redirect(302, clientEndpoint)
  }
