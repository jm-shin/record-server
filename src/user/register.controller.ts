import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './register.dto';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}
  @Post()
  registerUser(@Body() registerDto: RegisterDto) {
    return this.userService.registerUser(registerDto);
  }
}
