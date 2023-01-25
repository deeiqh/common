import { Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  private appService: any;

  constructor(@Inject('APP_CLIENT') private client: ClientGrpc) {
    this.appService = this.client.getService('CarService');
  }

  @Get()
  async foo(): Promise<{ a: 1 } | string> {
    try {
      return await firstValueFrom(this.appService.logCar({}));
    } catch (e) {
      return `Error: ${e.details}`;
    }
  }
}
