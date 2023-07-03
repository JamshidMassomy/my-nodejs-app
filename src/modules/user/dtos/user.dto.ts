import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/util/isNotExists.validator';

export class UserDto {
  @ApiProperty({ example: 'jamshid@example.com' })
  // @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty({ example: 'mystrong password' })
  @MinLength(6)
  password?: string;
}
