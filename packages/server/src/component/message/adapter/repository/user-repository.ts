import {
  ShowUserComponentHandler,
  UserNotFoundError,
} from '../../../user/adapter/handler/show-user-component-handler'
import { User } from '../../domain/entity'
import { UserRepository } from '../../domain/repository'

export class UserLowRepository implements UserRepository {
  private readonly showUserComponentHandler: ShowUserComponentHandler

  constructor({
    showUserComponentHandler,
  }: {
    showUserComponentHandler: ShowUserComponentHandler
  }) {
    this.showUserComponentHandler = showUserComponentHandler
  }

  async findUser(id: string): Promise<User | undefined> {
    const showUserResult = await this.showUserComponentHandler(id)

    if (showUserResult instanceof UserNotFoundError) {
      return undefined
    }

    return showUserResult
  }
}
