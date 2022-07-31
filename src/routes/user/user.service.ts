import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async create(user: CreateUserDto): Promise<User> {
		const userSaved = await this.userRepository.create(user).save();

		if (!userSaved) {
			throw new InternalServerErrorException(
				'Não foi possível criar usuário',
			);
		}

		return userSaved;
	}
}
