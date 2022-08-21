import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from '../database/user/user.entity';
import { DatabaseModule } from '../database/database.module';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from '../database/database.constants';
import { lastValueFrom } from 'rxjs';

const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  count: jest.fn(),
  delete: jest.fn(),
};

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
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUSer', () => {
    it('should return registerInfo without password', async () => {
      const data = {
        id: 'user01',
        password: '#####',
        username: 'jm',
        email: 'user01@example.com',
      };

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(data);

      const registerUser = await service.registerUser(data);
      expect(registerUser).toEqual({
        id: 'user01',
        username: 'jm',
        email: 'user01@example.com',
      });
    });
  });

  describe('updateUser', () => {
    it('should ', async () => {
      const updateInfo = {
        username: 'jongmin',
        email: 'change_email@example.com',
      };
      jest.spyOn(userRepository, 'count').mockResolvedValue(1);
      jest
        .spyOn(userRepository, 'update')
        .mockResolvedValue({ generatedMaps: [], raw: [], affected: 1 });

      await service.updateUser('user01', updateInfo);
      expect(userRepository.update).lastCalledWith('user01', { ...updateInfo });
    });
  });

  describe('findById', () => {
    it('should return one result', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: 'user01',
        password: '#####',
        username: 'jm',
        email: 'user01@example.com',
      });

      const foundUser = await lastValueFrom(service.findById('user01'));

      expect(foundUser).toEqual({
        id: 'user01',
        password: '#####',
        username: 'jm',
        email: 'user01@example.com',
      });
      expect(userRepository.findOne).lastCalledWith({
        where: { id: 'user01' },
      });
      expect(userRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('existsById', () => {
    it('should not exist return false', async () => {
      jest.spyOn(userRepository, 'count').mockResolvedValueOnce(0);
      const exists = await lastValueFrom(service.existsById('not_exist_user'));
      expect(exists).toEqual(false);
    });
    it('should exist return true', async () => {
      jest.spyOn(userRepository, 'count').mockResolvedValue(1);
      const notExists = await lastValueFrom(service.existsById('exist_user'));
      expect(notExists).toEqual(true);
    });
  });
});
