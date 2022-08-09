import { Body, ConflictException, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './register.dto';
import { mergeMap } from 'rxjs';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  registerUser(@Body() registerDto: RegisterDto) {
    const id = registerDto.id;
    return this.userService.existsById(id).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException(`id: ${id} is existsed`);
        } else {
          const email = registerDto.email;
          return this.userService.existsByEmail(email).pipe(
            mergeMap((exists) => {
              if (exists) {
                throw new ConflictException(`email: ${email} is existed`);
              } else {
                return this.userService.registerUser(registerDto);
              }
            }),
          );
        }
      }),
    );
  }
}
