import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import UpdateAvatarService from '../services/UpdateAvatarService';


const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        };

    return response.json(userWithoutPassword);
    });


usersRouter.patch(
    '/avatar',
    ensureAuthenticate,
    upload.single('avatar'),
    async (request, response) => {

        const updateUserAvatar = new UpdateAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar: request.file.filename,
        };

        return response.json(userWithoutPassword);

    },
);

export default usersRouter;
