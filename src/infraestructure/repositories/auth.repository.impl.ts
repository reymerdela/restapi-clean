import {
  AuthDatasource,
  AuthRepository,
  RegiserUserDto,
  UserEntity,
} from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  async register(registerUserDto: RegiserUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto)
  }
}
