import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SendOtpGuard } from './guards/send-otp.guard';
import { ValidateOtpGuard } from './guards/validate-otp.guard';

@Controller()
export class AppController {
  @UseGuards(SendOtpGuard, ValidateOtpGuard)
  @GrpcMethod('CarService', 'LogCar')
  async logCar(): Promise<{ a: 3 }> {
    return { a: 3 };
  }
}
