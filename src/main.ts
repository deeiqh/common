import { NestFactory } from '@nestjs/core';
import { GrpcOptions, KafkaOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcConfig } from './configs/grpc.config';
import { kafkaConfig } from './configs/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<KafkaOptions>(kafkaConfig);
  app.connectMicroservice<GrpcOptions>(grpcConfig);

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
