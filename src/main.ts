import { NestFactory } from '@nestjs/core';
import { GrpcOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcConfig } from './configs/grpc.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<GrpcOptions>(grpcConfig);

  await app.startAllMicroservices();
}
bootstrap();
