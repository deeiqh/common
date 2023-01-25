import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientModule } from './modules/client.module';

@Module({
  imports: [
    ClientModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    // }),
  ],
  controllers: [AppController],
})
export class AppModule {}
