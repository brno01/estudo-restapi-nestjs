import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export interface Login extends Request {
    user: User;
}
