import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { EmailSchedulingModule } from './email-scheduling/email-scheduling.module';
import { UsersModule } from './users/users.module';
import { FeatureFlagsModule } from './feature-flags/feature-flags.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ProviderServicesModule } from './providerServices/providerServices.module';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseFilesModule } from './database-files/database-files.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SmsModule } from './sms/sms.module';
import { BookingsModule } from './bookings/bookings.module';


@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        uploads: false,
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true,
        cache: 'bounded',
      }),
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
        TWILIO_SENDER_PHONE_NUMBER: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        MPESA_PASS_KEY: Joi.string().required(),
        MPESA_BUSINESS_SHORT_CODE: Joi.string().required(),
        MPESA_CONSUMER_KEY: Joi.string().required(),
        MPESA_CONSUMER_SECRET: Joi.string().required(),
        MPESA_OAUTH_TOKEN_URL: Joi.string().required(),
        C_TO_B_BUSINESS_CODE: Joi.string().required(),
        MPESA_PHONE_NUM: Joi.string().required(),
        GRAPHQL_PLAYGROUND: Joi.number(),
        CLOUDINARY_CLOUD_NAME:Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required()

      })
    }),
    DatabaseModule,
    AuthModule,
    EmailConfirmationModule,
    EmailSchedulingModule,
    UsersModule,
    FeatureFlagsModule,
    ReviewsModule,
    ProviderServicesModule,
    DatabaseFilesModule,
    CloudinaryModule,
    NotificationsModule,
    SmsModule,
    BookingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }