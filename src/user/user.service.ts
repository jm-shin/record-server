import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user/user.entity';
import { USER_REPOSITORY } from '../database/database.constants';
import { RegisterDto } from './register.dto';
import { from, Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<UserEntity>,
  ) {}

  findById(id: string): Observable<UserEntity> {
    return from(this.userRepository.findOne({ where: { id: id } }));
  }

  async registerUser(data: RegisterDto) {
    const registerUser = await UserEntity.create(data);
    return this.userRepository.save(registerUser);
  }
}
