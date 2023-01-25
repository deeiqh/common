import { Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller()
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  async makeCar(): Promise<void> {
    this.clientService.send('notification-result', { payload: true });
  }
}
