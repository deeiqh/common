import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class SendOtpGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToRpc().getData();
    const { uuid } = await this.appService.sendOperationOtp({ ...data });

    data.otp = { uuid };
    console.log('sendOtpGuard data: ', data);
    return true;
  }
}
