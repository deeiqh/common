import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

export const graphqlConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
};
