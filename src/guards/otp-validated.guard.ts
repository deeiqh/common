import { CanActivate, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class OtpValidatedGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  async canActivate(): Promise<boolean> {
    return await this.appService.otpValidated();
  }
}
