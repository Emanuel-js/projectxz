import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

/**
 * Options for sending a phishing simulation email
 */
interface PhishingEmailOptions {
  /** Recipient email address */
  to: string;
  /** Email subject */
  subject: string;
  /** Email content (HTML) */
  content: string;
  /** URL for tracking clicks */
  trackingUrl: string;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Send a phishing simulation email
   * @param options Email options including recipient, subject, content, and tracking URL
   * @returns Promise resolving to the sent message info
   */
  async sendPhishingEmail(options: PhishingEmailOptions): Promise<any> {
    const { to, subject, content, trackingUrl } = options;

    try {
      console.log('Mail service: Sending phishing email to:', to);

      // Create a minimal HTML email with just the content and a clickable tracking link
      // No fancy template, just plain text with a link
      const htmlContent = `${content} <a href="${trackingUrl}">Click here</a>`;

      const result = await this.mailerService.sendMail({
        to,
        subject,
        html: htmlContent, // Use direct HTML content instead of a template
      });

      console.log('Mail service: Email sent successfully');
      return result;
    } catch (error) {
      console.error('Mail service: Error sending email:', error);
      throw error;
    }
  }

  /**
   * Send a notification email
   * @param to Recipient email address
   * @param subject Email subject
   * @param templateName Template name without extension
   * @param context Data to be sent to the template engine
   * @returns Promise resolving to the sent message info
   */
  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, unknown>,
  ): Promise<any> {
    return this.mailerService.sendMail({
      to,
      subject,
      template: templateName,
      context: {
        ...context,
        year: new Date().getFullYear(),
        companyName: this.configService.get<string>(
          'EMAIL_FROM_NAME',
          'Phishing Simulator',
        ),
      },
    });
  }
}
