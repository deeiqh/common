import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { graphqlConfig } from './configs/graphql.config';

@Module({
  imports: [GraphQLModule.forRoot(graphqlConfig)],
  providers: [AppResolver],
})
export class AppModule {}
