import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { STRATEGY_NAME } from '../strategies/strategy-name.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(STRATEGY_NAME.JWT_ACCESS) {}
