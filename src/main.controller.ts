import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

import { ErrorSchema } from "@app/@common/application/documentations/openapi/swagger/error.schema";
import { ApiServerConfig } from "@core/@shared/infrastructure/config/env";

@Controller({
  version: '1',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
export class MainController {
  @Get('healthcheck')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ErrorSchema })
  execute(): { status: string } {
    return {
      status: `[${ApiServerConfig.ENV}] challenge-backend-xbri-api is online`,
    };
  }
}
