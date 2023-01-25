import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SendOtpGuard } from './guards/send-otp.guard';
import { ValidateOtpGuard } from './guards/validate-otp.guard';

@Controller()
export class AppController {
  @UseGuards(SendOtpGuard, ValidateOtpGuard)
  @EventPattern('notification-result')
  async logCar(data: Record<string, unknown>): Promise<void> {
    console.log('data', data);
  }
}
