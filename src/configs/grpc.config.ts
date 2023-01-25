import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcConfig: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3001',
    package: 'genericVerify',
    protoPath: join(__dirname, '../protos/generic-verify.proto'),
  },
};
