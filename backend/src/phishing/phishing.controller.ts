import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response, Request as ExpressRequest } from 'express';
import { PhishingService } from './phishing.service';

// Define a type for the authenticated request
interface AuthenticatedRequest extends ExpressRequest {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';
import { CreatePhishingDto } from './dto/create-phishing.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Phishing')
@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send a phishing email' })
  @ApiBody({ type: CreatePhishingDto })
  @ApiResponse({
    status: 201,
    description: 'The phishing email has been successfully sent.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Failed to send email.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token is missing or invalid.',
  })
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async create(
    @Body() createPhishingDto: CreatePhishingDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.phishingService.create(createPhishingDto, req.user.userId);
  }

  @Get('attempts')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all phishing attempts' })
  @ApiResponse({
    status: 200,
    description:
      'Returns all phishing attempts for the user or all attempts for admins.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token is missing or invalid.',
  })
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  async findAll(@Request() req: AuthenticatedRequest) {
    return this.phishingService.findAll(req.user.userId, req.user.role);
  }

  @SkipAuth()
  @Get('track/:trackingId')
  @ApiOperation({ summary: 'Track a phishing email click' })
  @ApiParam({
    name: 'trackingId',
    description: 'The tracking ID of the phishing attempt',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a thank you page and records the click.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid tracking ID.',
  })
  async trackClick(
    @Param('trackingId') trackingId: string,
    @Res() res: Response,
  ) {
    try {
      // First update the phishing attempt status
      await this.phishingService.trackClick(trackingId);

      // List of popular websites to redirect to
      const redirectSites = [
        'https://www.google.com',
        'https://www.facebook.com',
        'https://www.twitter.com',
        'https://www.linkedin.com',
        'https://www.github.com',
        'https://www.amazon.com',
        'https://www.youtube.com',
      ];

      // Select a random website from the list
      const randomSite =
        redirectSites[Math.floor(Math.random() * redirectSites.length)];

      // Redirect the user to the random website
      console.log(
        `Tracking successful for ID ${trackingId}. Redirecting to ${randomSite}`,
      );
      return res.redirect(randomSite);
    } catch (error) {
      console.error('Error tracking click:', error);
      return res.redirect('https://www.google.com'); // Fallback redirect
    }
  }
}
