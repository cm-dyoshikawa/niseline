import { User } from '../domain/entity'
import { UserRepository } from '../domain/repository'

export class UserNotFoundError extends Error {}

export type ShowUserUseCase = (id: string) => Promise<User | UserNotFoundError>

export const buildFindUserUseCase =
  ({ userRepository }: { userRepository: UserRepository }): ShowUserUseCase =>
  async (id: string) => {
    const user = await userRepository.find(id)
    if (user == null) {
      return new UserNotFoundError()
    }

    return user
  }
