import { Request, Response } from 'express'
import { AuthRepository, RegiserUserDto } from '../../domain'
export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = (req: Request, res: Response) => {
    const [error, regiserUserDto] = RegiserUserDto.create(req.body)
    if (error) return res.status(400).json({ error })
    this.authRepository
      .register(regiserUserDto!)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error))
  }
  loginUser = (req: Request, res: Response) => {
    res.json('loginUser controller')
  }
}
