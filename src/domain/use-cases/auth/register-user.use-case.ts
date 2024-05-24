import { Jwt } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface RegisterUserUseCase {
    execute(registerUser: RegisterUserDto): Promise<any>
}
type SignToken = (payload: Object, duration?: string) => Promise<string | null>

interface UserToken {
    token: string;
    user: {
        id: string,
        email: string,
        name: string
    }
}
export class RegisterUser implements RegisterUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = Jwt.generateToken
    ){}
    async execute(registerUser: RegisterUserDto): Promise<UserToken> {
        // Crear usuario
        const user = await this.authRepository.register(registerUser)
        //token 
        const token = await this.signToken({id: user.id},'2h')
        if ( ! token) {
            throw CustomError.internalServer('Error generating token')
        }

        return {
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
        }

            
    }
}