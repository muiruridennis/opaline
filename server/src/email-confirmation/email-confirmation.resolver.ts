import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailInput } from './dto/confirmEmail.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../auth/guards/jwt-auth.guard';
import FeatureFlagGuard from '../feature-flags/featureFlag.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class ConfirmationResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

@Resolver()
export class EmailConfirmationResolver {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) { }

  @Mutation(() => ConfirmationResponse)
  @UseGuards(FeatureFlagGuard('email-confirmation'))
  async confirmEmail(@Args('token') token: string): Promise<ConfirmationResponse> {
    try {
      const email = await this.emailConfirmationService.decodeConfirmationToken(token);
      await this.emailConfirmationService.confirmEmail(email);
      return { success: true, message: 'Email confirmed successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Mutation(() => ConfirmationResponse)
  @UseGuards(JwtAuthenticationGuard)
  @UseGuards(FeatureFlagGuard('email-confirmation'))
  async resendConfirmationLink(@Context() context: { req: RequestWithUser }): Promise<ConfirmationResponse> {
    try {
      await this.emailConfirmationService.resendConfirmationLink(context.req.user.id);
      return { success: true, message: 'Confirmation email resent successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
