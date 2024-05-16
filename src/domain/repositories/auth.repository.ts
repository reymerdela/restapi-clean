import { RegiserUserDto } from '../dtos/auth/register-user.dto'
import { UserEntity } from '../entities/user.entitiy'

export abstract class AuthRepository {
  abstract register(registerUserDto: RegiserUserDto): Promise<UserEntity>
}
