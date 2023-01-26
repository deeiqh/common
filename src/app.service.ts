import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Consumer } from 'kafkajs';

export class AppService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientKafka,
    @Inject('kafkaConsumer') private kafkaConsumer: Consumer,
  ) {}

  async sendOtp(input: { targetType: string; target: string }): Promise<void> {
    console.log('sendOtp input: ', input);
    this.client.emit('otp-validated', input.target);
    console.log('otp-validated event emitted. Shoud be by other service');
    return;
  }

  async otpValidated(target: string): Promise<boolean> {
    let validated = false;

    await this.kafkaConsumer.stop();
    await this.kafkaConsumer.subscribe({
      topic: 'otp-validated',
      fromBeginning: true,
    });
    await this.kafkaConsumer.run({
      eachMessage: async ({ message }) => {
        if (target === message.value?.toString()) {
          validated = true;
        }
      },
    });

    const maxMinutes = 5 / 60;
    const intervalTime = 100;
    const maxIterations = (maxMinutes * 60 * 1000) / intervalTime;
    let iteration = 0;
    let intervalId: NodeJS.Timer;
    const isOtpValidated = await new Promise<boolean>((resolve) => {
      intervalId = setInterval(() => {
        if (validated) {
          clearInterval(intervalId);
          resolve(true);
        }
        if (iteration > maxIterations) {
          clearInterval(intervalId);
          resolve(false);
        }
        iteration++;
      }, intervalTime);
    });

    return isOtpValidated;
  }
}
