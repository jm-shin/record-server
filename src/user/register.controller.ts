import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { mergeMap } from 'rxjs';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register.user.dto';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  registerUser(@Body() registerDto: RegisterUserDto) {
    const id = registerDto.id;
    return this.userService.existsById(id).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException(`id: ${id} is existed`);
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

  @Get('dupcheck/id/:id')
  async duplicateCheckId(@Param('id') id: string, @Res() res: Response) {
    const exists = await this.userService.checkById(id);
    if (exists) {
      throw new ConflictException('id exists');
    } else {
      return res.status(200).send();
    }
  }

  @Get('dupcheck/email/:email')
  async duplicateCheckEmail(
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    const exists = await this.userService.checkByEmail(email);
    if (exists) {
      throw new ConflictException('email exists');
    } else {
      return res.status(200).send();
    }
  }
}
