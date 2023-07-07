import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'jamshid@example.com' })
  @IsNotEmpty()
  @MaxLength(25)
  @IsEmail()
  @MinLength(10)
  email: string | null;

  @ApiProperty({ example: 'mystrong password' })
  @MinLength(6)
  @MaxLength(25)
  @IsNotEmpty()
  password?: string;
}
