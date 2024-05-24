import { BcryptAdapter } from '../../config'
import { UserModel } from '../../data/mongodb'
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain'
import { AuthDatasource } from '../../domain'
import { UserMapper } from '../mapper/user.mapper'

type hashFunction = (password: string) => string
type compareFunction = (password: string, hashed: string) => boolean

export class AuthDatasouceImpl implements AuthDatasource {

  constructor(
    private readonly hashPassword: hashFunction = BcryptAdapter.hash,
    private readonly comparePassword: compareFunction = BcryptAdapter.compare
  ){
  }

  
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const {email,password} = loginUserDto

    try {
      
      const user = await UserModel.findOne({email})
      if(!user) throw CustomError.badRequest('User does not exist')
        
      const isMatching = this.comparePassword(password,user.password)
      if (!isMatching) throw CustomError.badRequest('Password is not valid')
    

      return UserMapper.userEntityFromObject(user)

    } catch (error) {
      if (error instanceof CustomError){
        throw error
      }

      throw CustomError.internalServer()
      
    }

  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto

    try {
    
      const exists = await UserModel.findOne({email})  
      if (exists) {
        throw CustomError.badRequest('User already exist')
      }
      
      const user = await UserModel.create({
        name,
        password: this.hashPassword(password),
        email
      })
      await user.save()
      
      // // Mapear la respuesta a nuestra entidad
      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      
      if (error instanceof CustomError) {
        throw error
      }
      
      throw CustomError.internalServer()
    }
  }

  
}
