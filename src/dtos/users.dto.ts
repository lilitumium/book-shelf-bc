import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  @MinLength(6)
  public password: string;
}
