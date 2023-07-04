import { Injectable, NestMiddleware } from '@nestjs/common';
import { UNAUTHORIZED_ERROR } from '../constants/error.constant';

@Injectable()
export class WhitelistMiddleware implements NestMiddleware {
  private readonly allowedPaths: string[] = ['/public', '/health-check'];

  use(req: any, res: any, next: any) {
    const isAllowed = this.allowedPaths.some((path) =>
      req?.url.startsWith(path),
    );

    if (isAllowed) {
      return next();
    }

    if (!req.user) {
      return res.status(401).json({ message: UNAUTHORIZED_ERROR });
    }

    return next();
  }
}
