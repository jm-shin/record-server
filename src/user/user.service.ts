import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user/user.entity';
import { USER_REPOSITORY } from '../database/database.constants';
import { RegisterDto } from './register.dto';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<UserEntity>,
  ) {}

  findById(id: string): Observable<UserEntity> {
    return from(this.userRepository.findOne({ where: { id } }));
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

  async registerUser(data: RegisterDto) {
    const registerUser = await UserEntity.create(data);
    return this.userRepository.save(registerUser);
  }
}
