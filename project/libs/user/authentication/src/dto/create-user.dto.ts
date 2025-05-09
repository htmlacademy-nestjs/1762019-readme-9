import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User unique address',
    default: 'user@notfound.local',
    example: 'user@user.ru'
  })
  public email!: string;

  @ApiProperty({
    type: String,
    description: 'User birth date',
    example: '1981-03-12',
    default: '2012-02-22',
  })
  public dateBirth!: string;

  @ApiProperty({
    type: String,
    description: 'User first name',
    example: 'Keks',
  })
  public firstname!: string;

  @ApiProperty({
    type: String,
    description: 'User last name',
    default: 'Smith',
    example: 'Ivanov'
  })
  public lastname!: string;

  @ApiProperty({
    type: String,
    description: 'User last name',
    example: 'Ivanov',
    default: '123456',
  })
  public password!: string;
}
