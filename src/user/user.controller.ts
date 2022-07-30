import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) { }

	@Get()
	async findAll(): Promise<User[]> {
		const users = await this.userService.findAll();
		return users;
	}

	@Get('/:email')
	async findOne(email: string): Promise<User> {
		const user = await this.userService.findOne(email);
		return user;
	}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		const user = await this.userService.create(createUserDto);
		return user;
	}
}
