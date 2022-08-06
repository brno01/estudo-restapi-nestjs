import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/shared/user.service';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
        expect(userRepository).toBeDefined();
    });
});
