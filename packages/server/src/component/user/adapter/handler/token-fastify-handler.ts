import { RouteHandlerMethod } from 'fastify'

export const buildTokenFastifyHandler =
  (): RouteHandlerMethod => async (request, reply) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const body = request.body as {
      authorizationCode: string
      redirectUri: string
      code: string
    }

    reply.type('application/json').code(200).send({
      accessToken: 'DEFAULT_USER_ACCESS_TOKEN',
      idToken: 'DEFAULT_USER_ID_TOKEN',
    })
  }
