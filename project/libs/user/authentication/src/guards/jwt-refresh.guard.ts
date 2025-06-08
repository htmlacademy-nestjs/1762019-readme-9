import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_NAME } from '../strategies/strategy-name.constants';

export class JwtRefreshGuard extends AuthGuard(STRATEGY_NAME.JWT_REFRESH) {}
