import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user/user.entity';
import { USER_REPOSITORY } from '../database/database.constants';
import { EMPTY, filter, from, mergeMap, Observable, of } from 'rxjs';
import { map, throwIfEmpty } from 'rxjs/operators';
import { RegisterUserDto } from './dto/register.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<UserEntity>,
  ) {}

  findById(id: string): Observable<UserEntity> {
    return from(this.userRepository.findOne({ where: { id } })).pipe(
      mergeMap((user) => (user ? of(user) : EMPTY)),
      map((user) => {
        delete user.password;
        return user;
      }),
      throwIfEmpty(() => new NotFoundException(`user:${id} was not found`)),
    );
  }

  existsById(id: string): Observable<boolean> {
    return from(this.userRepository.count({ where: { id } })).pipe(
      map((m) => !!m),
    );
  }

  existsByEmail(email: string): Observable<boolean> {
    return from(this.userRepository.count({ where: { email } })).pipe(
      map((m) => !!m),
    );
  }

  async registerUser(data: RegisterUserDto) {
    const registerInfo = await UserEntity.create(data);
    const registerUser = await this.userRepository.save(registerInfo);
    delete registerUser['password'];
    return registerUser;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const exists = await this.userRepository.count({ where: { id } });
    if (exists) {
      const updateInfo = await UserEntity.update(data);
      await this.userRepository.update(id, { ...updateInfo }).catch(() => {
        throw new BadRequestException('update data invalid');
      });
    } else {
      throw new NotFoundException('update user id not found');
    }
  }

  deleteById(id: string): Observable<any> {
    return from(this.userRepository.delete({ id })).pipe(
      map((result) => {
        if (!result.affected)
          throw new NotFoundException('delete id not found');
      }),
    );
  }

  checkById(id: string) {
    return this.userRepository.count({ where: { id } });
  }

  checkByEmail(email: string) {
    return this.userRepository.count({ where: { email } });
  }
}
