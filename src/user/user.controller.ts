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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
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
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiConflictResponse({
    status: 409,
    description: 'User already exists with this email',
  })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all users of database',
  })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBearerAuth()
  async getAll(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find a specified user',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a specified user',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    status: 200,
    description: 'User updated',
    type: User,
  })
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, { ...user });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a specified user',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User deleted',
    type: User,
  })
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
