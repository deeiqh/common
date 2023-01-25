import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class SendOtpGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}
