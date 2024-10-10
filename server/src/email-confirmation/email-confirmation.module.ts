import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { FeatureFlagsModule } from '../feature-flags/feature-flags.module';
import { EmailConfirmationResolver } from './email-confirmation.resolver';
import { TemplateModule } from '../templates/templates.module';

@Module({
  imports: [
    ConfigModule,
    TemplateModule,

    EmailModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        service: configService.get('EMAIL_SERVICE'),
        user: configService.get('EMAIL_USER'),
        password: configService.get('EMAIL_PASSWORD'),
      }),
    }),
    JwtModule.register({}),
    UsersModule,
    FeatureFlagsModule,
  ],
  providers: [EmailConfirmationService, EmailConfirmationResolver],
  exports: [EmailConfirmationService],
  controllers: [],
})
export class EmailConfirmationModule { }