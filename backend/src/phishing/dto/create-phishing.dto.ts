import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhishingDto {
  @ApiProperty({
    description: 'Email address of the recipient',
    example: 'user@example.com',
  })
  @IsEmail()
  recipientEmail: string;

  @ApiProperty({
    description: 'Subject of the phishing email',
    example: 'Security Alert: Action Required',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Content of the phishing email',
    example: 'Please click the link below to verify your account security.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
