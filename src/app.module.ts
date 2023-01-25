import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientProxyFactory } from '@nestjs/microservices';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { grpcConfig } from './configs/grpc.config';

export const APP_CLIENT = 'APP_CLIENT';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create(grpcConfig);
      },
    },
    AppResolver,
  ],
})
export class AppModule {}
