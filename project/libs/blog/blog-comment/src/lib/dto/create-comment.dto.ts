import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { BlogCommentValidateMessage } from '../blog-comment.constants';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public message: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId: string;
}
