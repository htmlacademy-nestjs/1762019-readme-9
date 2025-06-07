import { Entity, StorableEntity, Category } from '@project/core';

export class BlogCategoryEntity extends Entity implements StorableEntity<Category> {
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(category?: Category) {
    super();
    this.populate(category);
  }

  public populate(category?: Category) {
    if (!category) {
      return;
    }

    this.id = category.id ?? '';
    this.title = category.title;
    this.createdAt = category.createdAt ?? undefined;
    this.updatedAt = category.updatedAt ?? undefined;
  }

  public toPOJO(): Category {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
