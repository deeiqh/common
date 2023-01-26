import { OnModuleInit } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { grpcConfig } from './configs/grpc.config';

@InputType()
class ChangeNameRequest {
  @Field()
  targetType: string;
  @Field()
  target: string;
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
export class AppResolver implements OnModuleInit {
  @Client(grpcConfig)
  readonly client: ClientGrpc;

  appService: any;

  onModuleInit() {
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
