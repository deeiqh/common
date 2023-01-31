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
      const otpTargetType = headers['otp-target-type'];
      const otpTarget = headers['otp-target'];
      const otpRandomUuidForOperations =
        headers['otp-random-uuid-for-operations'];

      return await firstValueFrom(
        this.appService.changeName({
          otpTargetType,
          otpTarget,
          otpRandomUuidForOperations,
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
    @Context() context: any,
    @Args('input') input: ValidateOperationOtpRequest,
  ): Promise<BaseResponse> {
    try {
      const otpRandomUuidForOperations =
        context.req.headers['otp-random-uuid-for-operations'];
      return await firstValueFrom(
        this.appService.validateOperationOtp({
          uuid: otpRandomUuidForOperations,
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
