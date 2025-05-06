import { compare, genSalt, hash } from 'bcrypt';

import { StorableEntity, AuthUser, UserRole, Entity } from '@project/core';
import { SALT_ROUNDS } from './blog-user.constants';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email = '';
  public firstname = '';
  public lastname = '';
  public dateOfBirth: Date = new Date();
  public role: UserRole = UserRole.User;
  public passwordHash = '';

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.dateOfBirth = user.dateOfBirth;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      dateOfBirth: this.dateOfBirth,
      role: this.role,
      passwordHash: this.passwordHash,
    }
  }
}
