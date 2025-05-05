import { Entity } from '@project/core';

export interface RepositoryWriter<T extends Entity> {
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  deleteById(id: T['id']): Promise<void>;
}

export interface RepositoryReader<T extends Entity> {
  findById(id: T['id']): Promise<T | null>;
  getAll(): Promise<T[]>;
}

export type Repository<T extends Entity> = RepositoryWriter<T> & RepositoryReader<T>;
