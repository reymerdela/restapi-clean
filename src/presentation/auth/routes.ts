import { Router } from 'express'
import { AuthController } from './controller'
import { AuthDatasouceImpl, AuthRepositoryImpl } from '../../infraestructure'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()
    const datasouce = new AuthDatasouceImpl()
    const authRepository = new AuthRepositoryImpl(datasouce)
    const controller = new AuthController(authRepository)

    router.post('/register', controller.registerUser)
    router.post('/login', controller.loginUser)
    router.get('/',AuthMiddleware.validateJwt,controller.getUsers)
    return router
  }
}
