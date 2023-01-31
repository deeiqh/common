import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OtpValidatedGuard } from './guards/otp-validated.guard';
import { SendOtpGuard } from './guards/send-otp.guard';

type ChangeNameRequest = {
  targetType: string;
  target: string;
  operationUUID: string;
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
    operationUUID: string;
    code: string;
  }): Promise<BaseResponse> {
    const { operationUUID, code } = input;

    await this.appService.validateOperationOtp({ operationUUID, code });

    return { message: operationUUID, statusCode: '200' };
  }
}
