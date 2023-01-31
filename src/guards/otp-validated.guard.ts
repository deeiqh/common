import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class OtpValidatedGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToRpc().getData();
    console.log('otpValidatedGuard data: ', data);

    return await this.appService.otpValidated({ uuid: data.otp.uuid });
  }
}
