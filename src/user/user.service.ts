import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll()
    : Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new InternalServerErrorException('Nenhum usuário encontrado');
    }
    return users;
  }

  async findOne(email: string)
    : Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new InternalServerErrorException('Usuário não encontrado');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto)
    : Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Erro ao criar o usuário');
    }

    return userSaved;
  }
}
