import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { UserEntity } from '../database/user/user.entity';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Observable<Partial<UserEntity>> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  @Put(':id')
  putUser(@Param('id') id: string, @Body() body) {}
}
