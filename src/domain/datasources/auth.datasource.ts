import { RegiserUserDto } from '../dtos/auth/register-user.dto'
import { UserEntity } from '../entities/user.entitiy'

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegiserUserDto): Promise<UserEntity>
}