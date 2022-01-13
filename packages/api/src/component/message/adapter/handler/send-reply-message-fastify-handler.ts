import { RouteHandlerMethod } from 'fastify'

// interface SendReplyMessageRequestBody {
//   replyToken: string // 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
//   messages: ReadonlyArray<{
//     type: string // 'text'
//     text: string // 'Hello, user'
//   }>
// }

type SendReplyMessageResponseBody = {}

export const buildSendReplyMessageFastifyHandler =
  (): RouteHandlerMethod => async (request, reply) => {
    // const requestBody: SendReplyMessageRequestBody = request.body

    // reply.type('application/json').code(400)

    reply.type('application/json').code(200)
    return {} as SendReplyMessageResponseBody
  }
