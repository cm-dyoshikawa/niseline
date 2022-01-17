import { RouteHandlerMethod } from 'fastify'
import { User } from '../../domain/entity'
import {
  FindUserByAccessTokenUseCase,
  UserNotFoundError,
} from '../../use-case/find-user-by-access-token-use-case'

export const buildFindUserByAccessTokenFastifyHandler =
  ({
    findUserByAccessTokenUseCase,
  }: {
    findUserByAccessTokenUseCase: FindUserByAccessTokenUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const [, accessToken] = request.headers.authorization!.split(' ')
    const user = await findUserByAccessTokenUseCase(accessToken)
    if (user instanceof UserNotFoundError) {
      reply.type('application/json').code(401).send()
      return
    }

    const responseBody: Pick<User, 'id' | 'name' | 'picture' | 'email'> = {
      id: user.id,
      name: user.name,
      picture: user.picture,
      email: user.email,
    }
    reply.type('application/json').code(200).send(responseBody)
  }
