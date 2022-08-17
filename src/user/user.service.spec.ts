import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from '../database/user/user.entity';
import { DatabaseModule } from '../database/database.module';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from '../database/database.constants';
import { lastValueFrom } from 'rxjs';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('찾는 아이디가 있으면 200를 반환한다.', async () => {
      jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
        return {
          exec: jest.fn().mockResolvedValue({
            id: 'user01',
            username: 'jmshin',
            password: '######',
            email: 'user01@email.com',
          } as UserEntity),
        } as any;
      });

      const foundUser = await lastValueFrom(service.findById('user01'));
      expect(foundUser).toEqual({
        id: 'user01',
        username: 'jmshin',
        password: '######',
        email: 'user01@email.com',
      });
    });
  });
});
