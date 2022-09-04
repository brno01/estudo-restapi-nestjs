import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseCollection } from '../common/base.collection';
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
    id: '12313123-123123a-asdad',
    name: 'Test',
    email: 'test@email.com',
    password: '@123456',
    active: true,
    createdAt: new (Date as any),
  } as User;

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      repositoryMock.find = jest.fn().mockReturnValue([user]);
      expect(user).toHaveLength(1);
      expect(repositoryMock.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('Should successfully get a user by id', async () => {
      repositoryMock.findOne = jest.fn().mockReturnValue(user);

      const result = await service.getUserById(user.id);

      expect(result).toStrictEqual(user);
    });

    it('Should throw the NotFoundException exception when user not found', async () => {
      const error = new NotFoundException('user with this ID not found');

      repositoryMock.findOne = jest.fn();

      await expect(service.getUserById(user.id)).rejects.toStrictEqual(error);
    });
  });


});