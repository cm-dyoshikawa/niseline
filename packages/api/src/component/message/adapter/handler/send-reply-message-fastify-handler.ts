import { RouteHandlerMethod } from 'fastify'
import {
  ReplyTokenInvalidError,
  SendReplyMessageUseCase,
} from '../../use-case/send-reply-message-use-case'

interface SendReplyMessageRequestBody {
  replyToken: string // 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA'
  messages: ReadonlyArray<{
    type: string // 'text'
    text: string // 'Hello, user'
  }>
}

type SendReplyMessageResponseBody = {}

export const buildSendReplyMessageFastifyHandler =
  ({
    sendReplyMessageUseCase,
  }: {
    sendReplyMessageUseCase: SendReplyMessageUseCase
  }): RouteHandlerMethod =>
  async (request, reply) => {
    const requestBody = request.body as SendReplyMessageRequestBody

    const sendReplyMessageUseCaseResult = await sendReplyMessageUseCase(
      requestBody.replyToken
    )

    if (sendReplyMessageUseCaseResult instanceof ReplyTokenInvalidError) {
      reply.type('application/json').code(400)
      return {
        message: 'Invalid reply token',
      }
    }

    reply.type('application/json').code(200)
    return {} as SendReplyMessageResponseBody
  }
