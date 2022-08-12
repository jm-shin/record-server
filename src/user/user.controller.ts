import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { from, Observable } from 'rxjs';
import { UserEntity } from '../database/user/user.entity';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Observable<Partial<UserEntity>> {
    return this.userService.findById(id);
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
