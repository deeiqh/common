import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { kafkaConfig } from './configs/kafka.config';

@Module({
  imports: [ClientsModule.register([{ name: 'USER_SERVICE', ...kafkaConfig }])],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'kafkaConsumer',
      useFactory: () => {
        const kafka = new Kafka({
          clientId: 'client',
          brokers: ['inspiron:9092'],
        });
        return kafka.consumer({ groupId: 'user-consumer-group' });
      },
    },
  ],
})
export class AppModule {}
