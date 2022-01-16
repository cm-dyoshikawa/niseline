import { GenerateUuid } from '../../../util/uuid'
import { UserRepository } from '../domain/repository'

type AuthorizationCode = string

export class UserNotFoundError extends Error {}

export type LoginUseCase = (
  userId: string
) => Promise<AuthorizationCode | UserNotFoundError>

export const buildLoginUseCase =
  ({
    userRepository,
    generateUuid,
  }: {
    userRepository: UserRepository
    generateUuid: GenerateUuid
  }): LoginUseCase =>
  async (userId: string) => {
    const user = await userRepository.find(userId)
    if (user == null) {
      return new UserNotFoundError()
    }

    const uuid = generateUuid()
    await userRepository.save({ ...user, authorizationCode: uuid })
    return uuid
  }
