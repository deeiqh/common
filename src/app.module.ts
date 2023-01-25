import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';

export const APP_CLIENT = 'APP_CLIENT';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'APP_CLIENT',
    //     transport: Transport.GRPC,
    //     options: {
    //       url: 'localhost:3001',
    //       package: 'genericVerify',
    //       protoPath:
    //         '/home/deeiqh/Documents/hapi/poc/gateway/src/protos/generic-verify.proto',
    //     },
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'genericVerify',
            protoPath:
              '/home/deeiqh/Documents/hapi/poc/gateway/src/protos/generic-verify.proto',
            url: 'localhost:3001',
          },
        });
      },
    },
  ],
})
export class AppModule {}
