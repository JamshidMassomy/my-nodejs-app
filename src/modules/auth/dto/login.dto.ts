import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsNotExist } from 'src/common/util/not_exists.validator';

export class LoginDto {
  @ApiProperty({ example: 'username or email' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  username: string | null;

  @ApiProperty({ example: 'your password' })
  @IsNotEmpty()
  password?: string;
}
