import { PartialType } from '@nestjs/swagger';
import { CreatePhishingDto } from './create-phishing.dto';

export class UpdatePhishingDto extends PartialType(CreatePhishingDto) {}
