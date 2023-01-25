import { NestFactory } from '@nestjs/core';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcConfig } from './configs/grpc.config';
import { kafkaConfig } from './configs/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice<KafkaOptions>(kafkaConfig);
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'genericVerify',
      url: 'localhost:3001',
      protoPath:
        '/home/deeiqh/Documents/hapi/poc/app/src/protos/generic-verify.proto',
    },
  });

  await app.startAllMicroservices();

  // await app.listen(3002);
}
bootstrap();
