import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class ValidateOtpGuard implements CanActivate {
  async canActivate(): Promise<boolean> {
    const p = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('anything');
      }, 1000);
    });
    await p;
    return true;
  }
}
