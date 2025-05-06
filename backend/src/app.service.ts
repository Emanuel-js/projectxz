import { Injectable } from '@nestjs/common';

export interface Task {
  id: string;
  content: string;
  createdAt: string;
}

@Injectable()
export class AppService {}
