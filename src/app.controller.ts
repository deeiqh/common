import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OtpValidatedGuard } from './guards/otp-validated.guard';
import { SendOtpGuard } from './guards/send-otp.guard';

type ChangeNameRequest = {
  targetType: string;
  target: string;
  newName: string;
};
type BaseResponse = { message: string; statusCode: string };
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(SendOtpGuard, OtpValidatedGuard)
  @GrpcMethod('UserService', 'ChangeName')
  async changeName(input: ChangeNameRequest): Promise<BaseResponse> {
    return { message: input.newName, statusCode: '200' };
  }

  @GrpcMethod('UserService', 'ValidateOperationOtp')
  async validateOperationOtp(input: {
    uuid: string;
    code: string;
  }): Promise<BaseResponse> {
    const { uuid, code } = input;
    await this.appService.validateOperationOtp({ uuid, code });
    return { message: input.uuid, statusCode: '200' };
  }
}
