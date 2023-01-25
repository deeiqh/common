import { Injectable } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { kafkaConfig } from 'src/configs/kafka.config';

@Injectable()
export class ClientService {
  @Client(kafkaConfig)
  client: ClientKafka;

  async send(
    category: string,
    message: Record<string, unknown>,
  ): Promise<void> {
    console.log(await firstValueFrom(this.client.emit(category, message)));
  }
}
