import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UNAUTHORIZED_ERROR } from 'src/common/constants/error.constant';
import { JWT_SECRET_KEY } from 'src/common/constants/public.constant';
import { CustomeException } from 'src/common/exceptions/custom.exception';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decodedToken = this.jwtService.verifyAsync(token, {
          secret: this.configService.getOrThrow(JWT_SECRET_KEY, {
            infer: true,
          }),
        });
        request.user = decodedToken;
        return true;
      } catch {
        throw new CustomeException(UNAUTHORIZED_ERROR, HttpStatus.UNAUTHORIZED);
      }
    }

    return false;
  }
}
