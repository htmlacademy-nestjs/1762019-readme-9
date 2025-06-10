import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUUID
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiPropertyOptional({
    description: 'Can be read from JWT payload'
  })
  @IsString()
  @IsMongoId()
  public userId: string;

  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  public categories: string[];
}
