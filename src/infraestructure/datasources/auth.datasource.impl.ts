import { CustomError, RegiserUserDto, UserEntity } from '../../domain'
import { AuthDatasource } from '../../domain'

export class AuthDatasouceImpl implements AuthDatasource {
  async register(registerUserDto: RegiserUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto

    try {
      // Verificar si el correo existe
      if ('reymerxd@gmail.com' === email) {
        throw CustomError.badRequest('Correo ya existe')
      }

      // Hash de la contraseña

      // Mapear la respuesta a nuestra entidad

      return new UserEntity('1', name, email, password, ['ADMIN_ROLE'])
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
