import { RouteHandlerMethod } from 'fastify'
import {
  FindUserByAuthorizationCodeUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-by-authorization-code-use-case'

export const buildTokenFastifyHandler =
  ({
    findUserByAuthorizationTokenUseCase,
  }: {
    findUserByAuthorizationTokenUseCase: FindUserByAuthorizationCodeUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const body = request.body as {
      grantType: string
      redirectUri: string
      code: string
    }

    const user = await findUserByAuthorizationTokenUseCase(body.code)
    if (user instanceof UserNotFoundError) {
      reply.type('application/json').code(401).send({
        message: 'Invalid authorization code',
      })
      return
    }

    reply.type('application/json').code(200).send({
      accessToken: user.accessToken,
      idToken: user.idToken,
    })
  }
