import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { UsersService } from '../users/users.service';
import { SendMessageInput } from './dto/sendMessage.input';

@Injectable()
export default class SmsService {
  private twilioClient: Twilio;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    console.log(accountSid)
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');

    return this.twilioClient.verify.v2.services(serviceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' })
  }

  async confirmPhoneNumber(userId: number, phoneNumber: string, verificationCode: string) {
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');

    const result = await this.twilioClient.verify.v2.services(serviceSid)
      .verificationChecks
      .create({ to: phoneNumber, code: verificationCode })

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }

    await this.usersService.markPhoneNumberAsConfirmed(userId)
  }

  async sendMessage(smsInput: SendMessageInput) {
    const { message, receiverPhoneNumber } = smsInput
    const senderPhoneNumber = this.configService.get('TWILIO_SENDER_PHONE_NUMBER');

    return await this.twilioClient.messages
      .create({ body: message, from: senderPhoneNumber, to: receiverPhoneNumber })
  }
}