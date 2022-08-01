import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../models/user.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
	constructor(
		private userService: UserService
	) { }

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findAll();
	}

	@Get(':/')
	async findOne(email: string): Promise<User> {
		return await this.userService.findOne(email);
	}

	@Post()
	@ApiBody({ type: CreateUserDto })
	async create(@Body() user: CreateUserDto): Promise<User> {
		return this.userService.create(user);
	}
}
