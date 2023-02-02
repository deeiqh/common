import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3001',
    package: 'user',
    protoPath: join(__dirname, '../protos/user.proto'),
  },
};
