import { OnModuleInit } from '@nestjs/common';
import {
  Args,
  Context,
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
  newName: string;
}

@InputType()
class ValidateOperationOtpRequest {
  @Field()
  operationUUID: string;
  @Field()
  code: string;
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
    @Context() context: any,
    @Args('input') input: ChangeNameRequest,
  ): Promise<BaseResponse> {
    try {
      const headers = context.req.headers;

      return await firstValueFrom(
        this.appService.changeName({
          targetType: headers['otp-target-type'],
          target: headers['otp-target'],
          operationUUID: headers['otp-new-uuid-for-this-operation'],
          ...input,
        }),
      );
    } catch (e) {
      return {
        message: `Error: ${e.details}`,
        statusCode: '403',
      };
    }
  }

  @Mutation(() => BaseResponse)
  async validateOperationOtp(
    @Args('input') input: ValidateOperationOtpRequest,
  ): Promise<BaseResponse> {
    try {
      return await firstValueFrom(
        this.appService.validateOperationOtp({
          ...input,
        }),
      );
    } catch (e) {
      return {
        message: `Error: ${e.details}`,
        statusCode: '403',
      };
    }
  }
}
