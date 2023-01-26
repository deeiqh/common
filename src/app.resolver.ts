import { Inject } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@InputType()
class ChangeNameRequest {
  @Field()
  email: string;
  @Field()
  newName: string;
}

@ObjectType()
class BaseResponse {
  @Field()
  message: string;
  @Field()
  statusCode: string;
}

@Resolver()
export class AppResolver {
  private appService: any;

  constructor(@Inject('USER_SERVICE') private client: ClientGrpc) {
    this.appService = this.client.getService('UserService');
  }

  @Query(() => String)
  async foo() {
    return 'foo';
  }

  @Mutation(() => BaseResponse)
  async changeName(
    @Args('input') input: ChangeNameRequest,
  ): Promise<BaseResponse> {
    try {
      return await firstValueFrom(this.appService.changeName(input));
    } catch (e) {
      return {
        message: `Error: ${e.details}`,
        statusCode: '403',
      };
    }
  }
}
