import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    type: String,
    default: 'user@notfound.local',
  })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    default: '123456',
  })
  public password!: string;
}
