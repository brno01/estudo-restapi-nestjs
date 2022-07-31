import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findAll();
	}

	@Post()
	@ApiBody({ type: CreateUserDto })
	async create(@Body() user: CreateUserDto): Promise<User> {
		return await this.userService.create(user);
	}
}
