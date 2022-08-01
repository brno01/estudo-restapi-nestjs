import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../models/user.entity';

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
			throw new InternalServerErrorException(
				'Não foi possível buscar usuários',
			);
		}

		return users;
	}

	async findOne(email: string)
		: Promise<User> {
		const user = await this.userRepository.findOneBy({ email });

		if (!user) {
			throw new InternalServerErrorException(
				'Não foi possível buscar este usuário + ${email}',
			);
		}

		return user;
	}

	async create(user: CreateUserDto)
		: Promise<User> {
		const userSaved = this.userRepository.create(user).save();

		if (!userSaved) {
			throw new InternalServerErrorException(
				'Não foi possível criar usuário',
			);
		}

		return userSaved;
	}
}