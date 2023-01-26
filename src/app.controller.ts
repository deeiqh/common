import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SendOtpGuard } from './guards/send-otp.guard';
import { ValidateOtpGuard } from './guards/validate-otp.guard';

type ChangeNameRequest = {
  targetType: string;
  target: string;
  newName: string;
};
type BaseResponse = { message: string; statusCode: string };
@Controller()
export class AppController {
  @UseGuards(SendOtpGuard, ValidateOtpGuard)
  @GrpcMethod('UserService', 'ChangeName')
  async changeName(input: ChangeNameRequest): Promise<BaseResponse> {
    return { message: input.newName, statusCode: '200' };
  }
}
