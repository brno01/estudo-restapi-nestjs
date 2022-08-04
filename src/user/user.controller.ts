import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Get all users of database',
    })
    async getAll(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Find a specified user',
    })
    @ApiConflictResponse({
        description: 'User already exists with this email',
    })
    async getOne(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new user',
    })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update a specified user',
    })
    @ApiBody({ type: UpdateUserDto })
    async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, { ...user });
    }
}