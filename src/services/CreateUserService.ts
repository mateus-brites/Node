import {getRepository} from 'typeorm'
import User from '../models/Users'
import AppError from '../errors/AppError';
import { hash } from 'bcryptjs'


interface Request{
    name: string,
    email: string,
    password: string,
}

class CreateUserService{
    public async execute({ name, email, password }: Request ): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: { email }
        });

        if (checkUserExist){
            throw new AppError('email adress alredy used.');
        }

        const hashadPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashadPassword,
        });



        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
