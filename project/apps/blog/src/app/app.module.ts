import { Module } from '@nestjs/common';

import { BlogCategoryModule } from '@project/blog-category';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [BlogCategoryModule, BlogCommentModule, BlogPostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
