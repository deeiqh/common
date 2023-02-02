import { NestFactory } from '@nestjs/core';
import { GrpcOptions, KafkaOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcOptions } from './configs/grpc.options';
import { kafkaOptions } from './configs/kafka.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<GrpcOptions>(grpcOptions);
  app.connectMicroservice<KafkaOptions>(kafkaOptions);

  await app.startAllMicroservices();
}
bootstrap();
