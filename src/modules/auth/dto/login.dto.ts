import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'username or email' })
  @IsNotEmpty()
  @IsEmail()
  username: string | null;

  @ApiProperty({ example: 'your password' })
  @IsNotEmpty()
  password?: string;
}
