import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../constants/authentication-validate-message.constants';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User unique address',
    default: 'user@notfound.local',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    type: String,
    description: 'User birth date',
    example: '1981-03-12',
    default: '2012-02-22',
  })
  @IsISO8601({}, { message: AuthenticationValidateMessage.DateBirthNotValid })
  public dateBirth: string;

  @ApiProperty({
    type: String,
    description: 'User first name',
    example: 'Keks',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    type: String,
    description: 'User last name',
    default: 'Smith',
    example: 'Ivanov'
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    type: String,
    description: 'User last name',
    example: 'Ivanov',
    default: '123456',
  })
  @IsString()
  public password: string;
}
