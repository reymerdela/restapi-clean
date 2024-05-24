import { Jwt } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { UserEntity } from "../../entities/user.entitiy";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface LoginUserUseCase {
    execute(loginUser: LoginUserDto): Promise<any>
}

interface UserToken {
    token: string;
    user: {
        id: string,
        email: string,
        name: string
    }
}
type SignToken = (payload: Object, duration?: string) => Promise<string | null>



export class LoginUser implements LoginUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = Jwt.generateToken
     ){}
    
    async execute(loginUser: LoginUserDto): Promise<UserToken> {
        
        const user = await this.authRepository.login(loginUser)
        const token = await this.signToken({id: user.id},'2h')
        if (!token ) throw CustomError.internalServer('Error generating token')
        return {
            token,
            user : {
                email: user.email,
                id: user.id,
                name: user.name
            }
        }
    }
}