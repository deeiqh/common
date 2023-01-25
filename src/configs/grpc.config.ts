import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcConfig: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3001',
    package: 'genericVerify',
    protoPath:
      '/home/deeiqh/Documents/hapi/poc/app/src/protos/generic-verify.proto',
  },
};
