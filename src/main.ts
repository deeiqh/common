import { NestFactory } from '@nestjs/core';
import { KafkaOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { kafkaConfig } from './configs/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<KafkaOptions>(kafkaConfig);
  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
