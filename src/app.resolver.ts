import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(): string {
    return 'hello';
  }

  @Mutation(() => String)
  async getCar(): Promise<string> {
    return 'a car';
  }
}
