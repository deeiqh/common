import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EventEmitter } from 'events';

export const OTP_OPERATION_MAX_MINUTES = 1;

@Injectable()
export class AppService {
  constructor(
    private readonly eventEmitter: EventEmitter,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async sendOperationOtp(input: {
    targetType: string;
    target: string;
    operationUUID: string;
  }): Promise<boolean> {
    const code = 'ABC';

    // Emit 'sendOperationOtp' event to notification service.
    // Event payload: code, targetType, target.

    const { operationUUID } = input;
    await this.cacheManager.set(operationUUID, {
      code,
    });

    return true;
  }

  async validateOperationOtp(input: {
    operationUUID: string;
    code: string;
  }): Promise<string> {
    const { operationUUID } = input;
    const { code } =
      ((await this.cacheManager.get(operationUUID)) as any) || {};

    const isValid = code === input.code;

    if (!code || isValid) {
      this.eventEmitter.emit('otp-validated', {
        operationUUID,
        isValid,
      });

      if (!code) {
        return 'Expired code';
      }

      await this.cacheManager.del(operationUUID);

      return 'Validated code';
    }

    return 'Invalid code. Try again.';
  }

  async otpValidated(input: { operationUUID: string }): Promise<boolean> {
    let wasProcessed = false;
    let isValid = false;

    this.eventEmitter.on('otp-validated', (payload) => {
      if (input.operationUUID === payload.operationUUID) {
        wasProcessed = true;
        isValid = payload.isValid;
      }
    });

    const maxMinutes = OTP_OPERATION_MAX_MINUTES;
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
