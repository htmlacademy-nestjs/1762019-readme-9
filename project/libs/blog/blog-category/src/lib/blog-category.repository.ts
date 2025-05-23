import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Category } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';

import { BlogCategoryEntity } from './blog-category.entity';
import { BlogCategoryFactory } from './blog-category.factory';
import { CategoryFilter, categoryFilterToPrismaFilter } from './blog-category.filter';
import { MAX_CATEGORY_LIMIT } from './blog-category.constants';

@Injectable()
export class BlogCategoryRepository extends BasePostgresRepository<
  BlogCategoryEntity,
  Category
> {
  constructor(
    entityFactory: BlogCategoryFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public override async save(entity: BlogCategoryEntity): Promise<void> {
    const record = await this.client.category.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
  }

  public override async findById(id: string): Promise<BlogCategoryEntity | null> {
    const document = await this.client.category.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: CategoryFilter): Promise<Array<BlogCategoryEntity | null>> {
    const where = filter ?? categoryFilterToPrismaFilter(filter);

    const documents = await this.client.category.findMany({
      where,
      take: MAX_CATEGORY_LIMIT,
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.category.delete({
      where: {
        id,
      },
    });
  }

  public override async update(entity: BlogCategoryEntity): Promise<void> {
    await this.client.category.update({
      where: { id: entity.id },
      data: {
        title: entity.title,
      },
    });
  }

  public async findByIds(ids: string[]): Promise<Array<BlogCategoryEntity | null>> {
    const records = await this.client.category.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
