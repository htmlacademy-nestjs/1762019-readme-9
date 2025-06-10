import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication/authentication.constants';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    type: String,
    default: 'user@notfound.local',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    default: '123456',
  })
  @IsString()
  public password: string;
}
