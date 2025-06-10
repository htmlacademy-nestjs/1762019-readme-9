import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_NAME } from '../strategies/strategy-name.constants';

export class LocalAuthGuard extends AuthGuard(STRATEGY_NAME.LOCAL) {}
