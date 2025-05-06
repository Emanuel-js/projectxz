import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './schema/phishing.schema';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
    MailModule,
    ConfigModule,
    UsersModule,
  ],
  providers: [PhishingService],
  controllers: [PhishingController],
})
export class PhishingModule {}
