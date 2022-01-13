import { UserRepository } from '../domain/repository'

export class ReplyTokenInvalidError extends Error {}

export type SendReplyMessageUseCase = (
  id: string
) => Promise<undefined | ReplyTokenInvalidError>

export const buildSendReplyMessageUseCase =
  ({
    userRepository,
  }: {
    userRepository: UserRepository
  }): SendReplyMessageUseCase =>
  async (id: string) => {
    const findUserResult = await userRepository.findUser(id)
    if (findUserResult == null) {
      return new ReplyTokenInvalidError()
    }

    return undefined
  }
