import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username!: string;

  @IsEmail()
  email!: string;
}