import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class SendOtpGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  async canActivate(): Promise<boolean> {
    await this.appService.sendOtp();
    return true;
  }
}
