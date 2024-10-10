import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import SmsService from './sms.service'; 
import { SendMessageInput } from './dto/sendMessage.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from '../auth/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CheckVerificationCodeInput } from './dto/check-verification-code.input';
import { SmsResponse } from './dto/sms-response.dto';

@Resolver()
export class SmsResolver {
  constructor(private readonly smsService: SmsService) { }

  @Mutation(() => SmsResponse)
  async sendMessage(
    @Args('smsInput') smsInput: SendMessageInput,) {
    try {
      await this.smsService.sendMessage(smsInput);
      return {
        status: 'success',
        message: 'Message sent successfully.',
      };
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }

  @Mutation(() => SmsResponse)
  @UseGuards(GraphqlJwtAuthGuard)
  async initiatePhoneNumberVerification(@Context() context: { req: RequestWithUser }) {
    const user = context.req.user;

    if (user.isPhoneNumberConfirmed) {
      throw new Error('Phone number already confirmed');
    }

    await this.smsService.initiatePhoneNumberVerification(user.phoneNumber);
    return {
      status: 'success',
      message: 'Verification code sent to phone number.',
    };
  }

  @Mutation(() => SmsResponse)
  @UseGuards(GraphqlJwtAuthGuard)
  async checkVerificationCode(
    @Context() context: { req: RequestWithUser },
    @Args('input') input: CheckVerificationCodeInput
  ) {
    const user = context.req.user;

    if (user.isPhoneNumberConfirmed) {
      throw new Error('Phone number already confirmed');
    }

    await this.smsService.confirmPhoneNumber(user.id, user.phoneNumber, input.code);
    return {
      status: 'success',
      message: 'Phone number confirmed successfully.',
    };
  }

}

