import {getRepository} from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from "../config/auth";
import User from '../models/Users';
import AppError from '../errors/AppError';


interface Request{
    email: string,
    password: string,
}

interface Response{
    user: User,
    token: string,
}

class AutenticateUserService{
    public async execute({ email, password }: Request): Promise<Response>{
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user){
            throw new AppError('email/password invalid', 401);
        }


        const passwordMashed = await compare(password, user.password);

        if (!passwordMashed){
            throw new AppError('email/password invalid', 401);
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret , {
            subject: user.id,
            expiresIn,
        });


        return {
            user,
            token
        };
    }
}

export default AutenticateUserService
