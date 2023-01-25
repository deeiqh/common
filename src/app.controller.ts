import { Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc, ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { APP_CLIENT } from './app.module';

@Controller()
export class AppController implements OnModuleInit {
  private appService: any;

  constructor(@Inject('APP_CLIENT') private client: ClientGrpc) {}

  onModuleInit() {
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
