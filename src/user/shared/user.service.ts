import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    //Get all users//
    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        if (!users) {
            throw new InternalServerErrorException(
                'Não foi possível buscar todos os usuários',
            );
        }
        return users;
    }

    //Search user by ID//
    async getUserById(id: string): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { id },
        });
        if (!checkUser) {
            throw new NotFoundException('Usuário não encontrado no sistema');
        }
        return checkUser;
    }

    //Auth JWT for login//
    async getUserByEmail(email: string): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!checkUser) {
            throw new NotFoundException('Usuário não encontrado pelo email');
        }
        return checkUser;
    }

    //Create new user//
    async createUser(user: CreateUserDto): Promise<User> {
        const checkUser = await this.userRepository.findOneBy({
            email: user.email,
        });
        if (checkUser) {
            throw new ConflictException('Usuário já existe no sistema');
        }
        const userCreating = {
            ...user,
            password: await bcrypt.hash(user.password, 12),
        };
        if (!userCreating) {
            throw new InternalServerErrorException(
                'Não foi possível criar usuário no sistema',
            );
        }
        const userCreated = this.userRepository.save(userCreating);
        return {
            ...userCreating,
            password: '******',
            ...userCreated,
        };
    }

    //Update user//
    async updateUser(id: string, user: UpdateUserDto): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { id },
        });
        if (!checkUser) {
            throw new ConflictException('Usuário não existe no sistema');
        }
        const userUpdated = await this.userRepository
            .create({
                id,
                ...user,
                password: await bcrypt.hash(user.password, 12),
            })
            .save();
        if (!userUpdated) {
            throw new InternalServerErrorException(
                'Não foi possível atualizar usuário',
            );
        }
        const userSaved = await this.userRepository.findOne({
            where: { id },
        });
        return userSaved;
    }

    //Delete user//
    async deleteUser(id: string): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { id },
        });
        if (!checkUser) {
            throw new ConflictException('Usuário não existe no sistema');
        }
        const userDeleted = await this.userRepository.delete({
            id,
        });
        if (!userDeleted) {
            throw new InternalServerErrorException(
                'Não foi possível deletar usuário',
            );
        }
        if (userDeleted) {
            throw new NotFoundException('Usurário deletado com sucesso');
        }
        return checkUser;
    }
}
