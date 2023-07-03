import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token);
        console.log('dedocde', decodedToken);
        request.user = decodedToken;
        console.log(request.user);
        return true;
      } catch (err) {}
    }

    return false;
  }
}
