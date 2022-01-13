import { User } from '../../domain/entity'
import {
  ShowUserUseCase,
  UserNotFoundError as ShowUserUseCaseUserNotFoundError,
} from '../../use-case/show-user-use-case'

export class UserNotFoundError extends Error {}

export type ShowUserComponentHandler = (
  id: string
) => Promise<User | UserNotFoundError>

export const buildShowUserComponentHandler =
  (showUserUseCase: ShowUserUseCase): ShowUserComponentHandler =>
  async (id: string) => {
    const showUserResult = await showUserUseCase(id)

    if (showUserResult instanceof ShowUserUseCaseUserNotFoundError) {
      return new UserNotFoundError()
    }

    return showUserResult
  }
