import { Container } from 'inversify'
import { UserLowRepository } from '../adapter/repository/user-repository'
import { buildRegisterUserUseCase } from '../core/user/use-case/register-user-use-case'
import { buildShowUserUseCase } from '../core/user/use-case/show-user-use-case'
import { DI_TYPE } from './type'

export const bootstrap = (): Container => {
  const container = new Container()

  container
    .bind(DI_TYPE.USER_REPOSITORY)
    .toDynamicValue(() => new UserLowRepository())

  container
    .bind(DI_TYPE.REGISTER_USER_USE_CASE)
    .toDynamicValue(({ container }) =>
      buildRegisterUserUseCase({
        userRepository: container.get(DI_TYPE.USER_REPOSITORY),
      })
    )
  container.bind(DI_TYPE.SHOW_USER_USE_CASE).toDynamicValue(({ container }) =>
    buildShowUserUseCase({
      userRepository: container.get(DI_TYPE.USER_REPOSITORY),
    })
  )

  return container
}
