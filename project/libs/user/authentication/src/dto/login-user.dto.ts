import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    default: 'user@notfound.local',
  })
  public email!: string;

  @ApiProperty({
    type: String,
    default: '123456',
  })
  public password!: string;
}
