import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { SendOtpGuard } from './guards/send-otp.guard';
import { ValidateOtpGuard } from './guards/validate-otp.guard';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(): string {
    return 'hello';
  }

  @Mutation(() => String)
  @UseGuards(SendOtpGuard)
  @UseGuards(ValidateOtpGuard)
  async getCar(): Promise<string> {
    return 'a car';
  }
}
