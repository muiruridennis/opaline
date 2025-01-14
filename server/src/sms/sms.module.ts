import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SmsService from './sms.service';
import SmsController from './sms.controller';
import { UsersModule } from '../users/users.module';
import { SmsResolver } from './sms.resolver';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [SmsController],
  providers: [SmsService, SmsResolver],
  exports: [SmsService]
})
export class SmsModule {}