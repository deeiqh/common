import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { grpcConfig } from './configs/grpc.config';

export const APP_CLIENT = 'APP_CLIENT';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create(grpcConfig);
      },
    },
  ],
})
export class AppModule {}
