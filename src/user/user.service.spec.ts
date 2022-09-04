import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(User));

  });

  beforeEach(() => jest.clearAllMocks());

  const user: User = {
    name: 'Test',
    email: 'test@email.com',
    password: '@123456',
  } as User;

  describe('getAllUsers', () => {
    it('Should return an array of users', async () => {
      repositoryMock.find = jest.fn().mockReturnValue([user]);
      const result = await service.getAllUsers();
      expect(result).toStrictEqual([user]);
      expect(repositoryMock.find).toHaveBeenCalledTimes(1);
    });

    it('Should throw the InternalServerErrorException', async () => {
      const error = new InternalServerErrorException('could not find all users');

      repositoryMock.find = jest.fn()

      await expect(service.getAllUsers()).rejects.toStrictEqual(error);
    });
  });

  describe('getUserById', () => {
    it('Should successfully get a user by id', async () => {
      repositoryMock.findOne = jest.fn().mockReturnValue(user);
      const result = await service.getUserById(user.id);
      expect(result).toStrictEqual(user);
      expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should throw the NotFoundException exception when user not found', async () => {
      const error = new NotFoundException('user with this ID not found');

      repositoryMock.findOne = jest.fn();

      await expect(service.getUserById(user.id)).rejects.toStrictEqual(error);
    });
  });


});