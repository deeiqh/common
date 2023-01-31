import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OtpValidatedGuard } from './guards/otp-validated.guard';
import { SendOtpGuard } from './guards/send-otp.guard';

type ChangeNameRequest = {
  otpTargetType: string;
  otpTarget: string;
  otpRandomUuidForOperations: string;
  newName: string;
};
type BaseResponse = { message: string; statusCode: string };
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'ChangeName')
  @UseGuards(SendOtpGuard, OtpValidatedGuard)
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

    return { message: uuid, statusCode: '200' };
  }
}
