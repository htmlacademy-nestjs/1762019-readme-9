import { Injectable } from '@nestjs/common';

import { BlogUserRepository } from '@project/blog-user';

@Injectable()
export class AuthenticationService {
  // @ts-expect-error: скоро пригодится
  constructor(private readonly blogUserRepository: BlogUserRepository) {}
}
