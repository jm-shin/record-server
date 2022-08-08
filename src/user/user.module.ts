import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { userProviders } from '../database/user/user.providers';
import { RegisterController } from './register.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
  controllers: [RegisterController],
})
export class UserModule {}
