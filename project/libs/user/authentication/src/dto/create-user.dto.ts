import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    default: 'user@notfound.local',
  })
  public email!: string;

  @ApiProperty({
    type: String,
    default: '2012-02-22',
  })
  public dateBirth!: string;

  @ApiProperty({
    type: String,
    default: 'Keks',
  })
  public firstname!: string;

  @ApiProperty({
    type: String,
    default: 'Smith',
  })
  public lastname!: string;

  @ApiProperty({
    type: String,
    default: '123456',
  })
  public password!: string;
}
