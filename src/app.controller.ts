import { Controller, Post, UseGuards } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { SendOtpGuard } from './guards/send-otp.guard';
import { ValidateOtpGuard } from './guards/validate-otp.guard';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  async makeCar(): Promise<void> {
    this.appService.send('notification-result', { a: 1 });
  }

  @UseGuards(SendOtpGuard, ValidateOtpGuard)
  @EventPattern('notification-result')
  async logCar(data: Record<string, unknown>): Promise<void> {
    console.log('data', data);
  }
}
