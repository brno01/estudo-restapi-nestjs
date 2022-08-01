import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { User } from '../entities/user.entity';
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

	@Get(':/email')
	async findOne(email: string): Promise<User> {
		return await this.userService.findOne(email);
	}

	@Post()
	@ApiBody({ type: CreateUserDto })
	async create(@Body() user: CreateUserDto): Promise<User> {
		return this.userService.create(user);
	}
}
