import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import {
    ApiBody,
    ApiConflictResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { UserService } from './shared/user.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({
        summary: 'Get all users of database',
    })
    async getAll(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }
    @UseGuards(JwtAuthGuard)

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

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({
        summary: 'Create a new user',
    })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOperation({
        summary: 'Update a specified user',
    })
    @ApiBody({ type: UpdateUserDto })
    @ApiOkResponse({
        status: 200,
        description: 'User updated',
        type: User
    })
    async update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateUser(id, { ...user });
    }

    @UseGuards(JwtAuthGuard)
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
