import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();

        if (!users) {
            throw new InternalServerErrorException(
                'Não foi possível buscar usuários',
            );
        }

        return users;
    }

    async getUserById(id: string): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { id },
        });

        if (!checkUser) {
            throw new NotFoundException(
                'Usuário não encontrado'
            );
        }

        return checkUser;
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const checkUser = await this.getUserById(user.email);
        if (checkUser) {
            throw new ConflictException('Usuário já existe no sistema');
        }
        const userSaved = this.userRepository.create({ ...user }).save();

        if (!userSaved) {
            throw new InternalServerErrorException(
                'Não foi possível criar usuário',
            );
        }

        return userSaved;
    }

    async updateUser(id: string, user: UpdateUserDto): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { id },
        });
        if (!checkUser) {
            throw new ConflictException('Usuário não existe no sistema');
        }
        const userUpdated = await this.userRepository.create({
            id, ...user
        }).save();
        if (!userUpdated) {
            throw new InternalServerErrorException(
                'Não foi possível atualizar usuário',
            );
        }

        return userUpdated;
    }
}