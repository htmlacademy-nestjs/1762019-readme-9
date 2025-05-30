import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Uniq category name',
    example: 'flowers'
  })
  @IsString()
  public title!: string;
}
