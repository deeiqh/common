import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SendOtpGuard } from './guards/send-otp.guard';
import { ValidateOtpGuard } from './guards/validate-otp.guard';

@Controller()
export class AppService {
  @UseGuards(SendOtpGuard, ValidateOtpGuard)
  @GrpcMethod('CarService', 'LogCar')
  async logCar(): Promise<{ a: 1 }> {
    return { a: 1 };
  }
}
