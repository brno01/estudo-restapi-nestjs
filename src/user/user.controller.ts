import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    ApiBody,
    ApiConflictResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

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
        status: 409,
        description: 'User already exists with this email',
    })
    @ApiOkResponse({
        status: 200,
        description: 'User found',
        type: User,
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
    async update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateUser(id, { ...user });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a specified user',
    })
    @ApiOkResponse({
        status: 200,
        description: 'User deleted',
    })
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }
}
