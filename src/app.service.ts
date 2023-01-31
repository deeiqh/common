/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EventEmitter } from 'events';

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter) {}

  async sendOperationOtp(input: {
    targetType: string;
    target: string;
  }): Promise<{ uuid: string }> {
    const uuid = randomUUID();

    // Emit 'sendOperationOtp' event to notification service.
    // Event payload: uuid, targetType, target.
    // Notification service write to one_time_password table.

    return { uuid };
  }

  async validateOperationOtp(input: {
    uuid: string;
    code: string;
  }): Promise<void> {
    // Read uuid register from one_time_password table
    // Compare code and check expiration date
    // Emit 'otp-validated' event to otpValidatedGuard

    const T = this.eventEmitter.emit('otp-validated', {
      uuid: input.uuid,
      isValid: true,
    });
    console.log('T: ', T);
  }

  //called inside the validateOtpGuard
  async otpValidated(input: { uuid: string }): Promise<boolean> {
    let wasProcessed = false;
    let isValid = false;
    this.eventEmitter.on('otp-validated', (payload) => {
      console.log('ON event');
      console.log(input.uuid, payload.uuid);
      if (input.uuid === payload.uuid) {
        wasProcessed = true;
        isValid = payload.isValid;
        console.log('ALL OK');
      }
    });

    const maxMinutes = 30 / 60;
    const intervalTime = 100;
    const maxIterations = (maxMinutes * 60 * 1000) / intervalTime;
    let iteration = 0;
    let intervalId: NodeJS.Timer;
    const isOtpValidated = await new Promise<boolean>((resolve) => {
      intervalId = setInterval(() => {
        if (wasProcessed) {
          if (isValid) {
            clearInterval(intervalId);
            resolve(true);
          }
          clearInterval(intervalId);
          resolve(false);
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
