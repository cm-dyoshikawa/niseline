import { Container } from 'inversify'
import {
  buildDebugPingFastifyHandler,
  buildDebugRegisterUserFastifyHandler,
} from '../component/user/adapter/handler/debug-fastify-handler'
import { UserLowRepository } from '../component/user/adapter/repository/user-repository'
import { buildRegisterUserUseCase } from '../component/user/use-case/register-user-use-case'
import { buildShowUserUseCase } from '../component/user/use-case/show-user-use-case'
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

  container
    .bind(DI_TYPE.DEBUG_PING_HANDLER)
    .toDynamicValue(() => buildDebugPingFastifyHandler())
  container
    .bind(DI_TYPE.DEBUG_REGISTER_USER_HANDLER)
    .toDynamicValue(() =>
      buildDebugRegisterUserFastifyHandler(
        container.get(DI_TYPE.REGISTER_USER_USE_CASE)
      )
    )

  return container
}
