import { CacheModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { EventEmitter } from 'events';
import { ConsumerConfig, Kafka, KafkaConfig } from 'kafkajs';
import { AppController } from './app.controller';
import { AppService, OTP_OPERATION_MAX_MINUTES } from './app.service';
import { kafkaOptions } from './configs/kafka.options';

@Module({
  imports: [
    CacheModule.register({
      ttl: OTP_OPERATION_MAX_MINUTES * 60 * 1000,
    }),
    ClientsModule.register([{ name: 'KAFKA_CLIENT', ...kafkaOptions }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EventEmitter,
    {
      provide: 'SOME_SERVICE_KAFKA_CONSUMER',
      useFactory: async (eventEmitter: EventEmitter) => {
        const kafka = new Kafka(kafkaOptions.options?.client as KafkaConfig);

        const consumer = kafka.consumer(
          kafkaOptions.options?.consumer as ConsumerConfig,
        );
        await consumer.connect();
        await consumer.subscribe({
          topic: 'otp-validated',
          fromBeginning: true,
        });

        await consumer.run({
          eachMessage: async ({ message }) => {
            const messageJson = JSON.parse(message.value?.toString() as string);

            eventEmitter.emit('otp-validated-result', {
              operationUUID: messageJson.operationUUID,
              isValid: messageJson.isValid,
            });
          },
        });

        return consumer;
      },
      inject: [EventEmitter],
    },
  ],
})
export class AppModule {}
