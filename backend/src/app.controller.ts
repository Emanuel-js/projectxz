import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Redirect('/api/docs')
  @ApiExcludeEndpoint()
  redirectToApiDocs() {
    return;
  }
}
