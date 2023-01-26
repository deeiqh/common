import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'client',
      brokers: ['inspiron:9092'],
    },
    consumer: {
      groupId: 'user-consumer-group',
      retry: {
        retries: 2,
        initialRetryTime: 30,
      },
    },
  },
};
