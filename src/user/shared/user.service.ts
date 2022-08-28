import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

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
      message: 'Usuário criado com sucesso',
      ...userCreating,
      password: '******',
      ...userCreated,
    };
  }

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
  async AuthJWTSearch(email: string): Promise<User> {
    const checkUser = await this.userRepository.findOne({
      where: { email },
    });
    if (!checkUser) {
      throw new NotFoundException('Usuário não encontrado pelo email');
    }
    return checkUser;
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
      throw new NotFoundException('Usuário deletado com sucesso');
    }
    return checkUser;
  }
}