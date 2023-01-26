import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
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
  @UseGuards(SendOtpGuard, OtpValidatedGuard)
  @GrpcMethod('UserService', 'ChangeName')
  async changeName(input: ChangeNameRequest): Promise<BaseResponse> {
    return { message: input.newName, statusCode: '200' };
  }
}
