import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class PhishingAttempt extends Document {
  @Prop({ required: true })
  recipientEmail: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  @Prop({ default: false })
  isClicked: boolean;

  @Prop()
  clickedAt?: Date;

  @Prop({ default: 'pending' })
  status: 'pending' | 'sent' | 'clicked' | 'failed';

  @Prop({ required: true, unique: true })
  trackingId: string;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);
