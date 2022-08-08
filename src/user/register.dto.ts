import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
