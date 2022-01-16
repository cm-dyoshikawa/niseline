import { User } from '../domain/entity'
import { UserRepository } from '../domain/repository'

export class UserNotFoundError extends Error {}

export type FindUserByAuthorizationCodeUseCase = (
  authorizationCode: string
) => Promise<User | UserNotFoundError>

export const buildFindUserByAuthorizationCodeUseCase =
  ({
    userRepository,
  }: {
    userRepository: UserRepository
  }): FindUserByAuthorizationCodeUseCase =>
  async (authorizationCode: string) => {
    const user = await userRepository.findByAuthorizationCode(authorizationCode)
    if (user == null) {
      return new UserNotFoundError()
    }

    return user
  }
