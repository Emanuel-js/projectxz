import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

import { v4 as uuidv4 } from 'uuid';
import { PhishingAttempt } from './schema/phishing.schema';
import { CreatePhishingDto } from './dto/create-phishing.dto';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private readonly phishingAttemptModel: Model<PhishingAttempt>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createPhishingDto: CreatePhishingDto,
    userId: string,
  ): Promise<PhishingAttempt> {
    const trackingId = uuidv4();
    const trackingUrl = `${this.configService.get<string>('BASE_URL')}/phishing/track/${trackingId}`;

    const phishingAttempt = await this.phishingAttemptModel.create({
      ...createPhishingDto,
      createdBy: userId,
      trackingId,
    });

    try {
      console.log(
        'Sending phishing email to:',
        createPhishingDto.recipientEmail,
      );
      console.log('Using tracking URL:', trackingUrl);

      await this.mailService.sendPhishingEmail({
        to: createPhishingDto.recipientEmail,
        subject: createPhishingDto.subject,
        content: createPhishingDto.content,
        trackingUrl: trackingUrl,
      });

      console.log('Email sent successfully');
      phishingAttempt.status = 'sent';
      await phishingAttempt.save();
    } catch (error: any) {
      console.error('Failed to send email:', error);
      phishingAttempt.status = 'failed';
      await phishingAttempt.save();
      throw new BadRequestException(
        `Failed to send email: ${error.message ?? 'Unknown error'}`,
      );
    }

    return phishingAttempt;
  }

  async findAll(userId: string, role: string): Promise<PhishingAttempt[]> {
    const query = role === 'admin' ? {} : { createdBy: userId };
    return this.phishingAttemptModel
      .find(query)
      .populate('createdBy', 'name email')
      .exec();
  }

  async trackClick(trackingId: string): Promise<PhishingAttempt> {
    console.log(`Tracking click for ID: ${trackingId}`);

    const phishingAttempt = await this.phishingAttemptModel.findOne({
      trackingId,
    });

    if (!phishingAttempt) {
      console.error(`Invalid tracking ID: ${trackingId}`);
      throw new BadRequestException('Invalid tracking ID');
    }

    console.log(
      `Found phishing attempt: ${phishingAttempt.id}, current status: ${phishingAttempt.status}, isClicked: ${phishingAttempt.isClicked}`,
    );

    // Always update the status to ensure it works
    phishingAttempt.isClicked = true;
    phishingAttempt.clickedAt = new Date();
    phishingAttempt.status = 'clicked';

    try {
      await phishingAttempt.save();
      console.log(
        `Successfully updated phishing attempt ${phishingAttempt.id} to clicked status`,
      );
    } catch (error: any) {
      console.error(
        `Error saving phishing attempt: ${error?.message ?? 'Unknown error'}`,
      );
      throw error;
    }

    return phishingAttempt;
  }
}
