import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { RoleType } from '../../shared/enum/role-type';
import { AccountStatus } from '../../shared/enum/account-status';

export class RegisterUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  // @IsString()
  // readonly department: string;
  //
  // @IsEnum([RoleType.SENIOR, RoleType.MIDDLE, RoleType.JUNIOR])
  // readonly role: RoleType;
  //
  // @IsEnum([AccountStatus.VALID, AccountStatus.INVALID])
  // readonly status: AccountStatus;
}
