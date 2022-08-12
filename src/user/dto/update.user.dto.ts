import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleType } from '../../shared/enum/role-type';
import { AccountStatus } from '../../shared/enum/account-status';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  // @IsOptional()
  // @IsString()
  // readonly department: string;
  //
  // @IsOptional()
  // @IsEnum([RoleType.SENIOR, RoleType.MIDDLE, RoleType.JUNIOR])
  // readonly role: RoleType;
  //
  // @IsOptional()
  // @IsEnum([AccountStatus.VALID, AccountStatus.INVALID])
  // readonly status: AccountStatus;
}
