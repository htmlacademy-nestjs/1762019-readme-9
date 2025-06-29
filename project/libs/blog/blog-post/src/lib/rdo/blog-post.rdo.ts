import { Expose, Type } from 'class-transformer';

import { CategoryRdo } from '@project/blog-category';
import { Comment } from '@project/core';

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public content: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public userId: string;

  @Expose()
  @Type(() => CategoryRdo)
  public categories: CategoryRdo[];

  @Expose()
  public comments: Comment[]
}
