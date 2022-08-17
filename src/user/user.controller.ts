import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { from, Observable } from 'rxjs';
import { UserEntity } from '../database/user/user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { map } from 'rxjs/operators';

@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Observable<Partial<UserEntity>> {
    return from(this.userService.findById(id)).pipe(
      map((user) => {
        delete user.password;
        return user;
      }),
    );
  }

  @Put(':id')
  putUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<boolean> {
    return from(this.userService.deleteById(id)).pipe();
  }
}
