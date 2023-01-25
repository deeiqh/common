import { Controller } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { kafkaConfig } from './configs/kafka.config';

@Controller()
export class AppController {
  // @UseGuards(SendOtpGuard)
  @EventPattern('notification-result')
  // @UseGuards(ValidateOtpGuard)
  async logCar(): Promise<void> {
    console.log('aaaaaaaaaaaaaaaaaaaaa car');
  }
}
