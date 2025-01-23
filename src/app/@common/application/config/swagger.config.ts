import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import type { SwaggerCustomOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

import { ApiServerConfig } from '@core/@shared/infrastructure/config/env/api-server.config';

const logger = new Logger('Swagger');

export const applySwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('API to access manager')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme('v3');
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Authentication API Docs',
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
    },
  };
  SwaggerModule.setup('api-doc', app, document, customOptions);

  logger.log(
    `📄 Documentation is running in http://localhost:${ApiServerConfig.PORT}/api-doc`,
  );
};
