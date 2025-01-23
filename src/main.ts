import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { Logger } from '@nestjs/common';
import { ApiServerConfig } from "@core/@shared/infrastructure/config/env";



const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  await app.listen(ApiServerConfig.PORT).then(() => {
    logger.log(
      `🚀 Challenge API is running in http://localhost:${ApiServerConfig.PORT}`,
    );
  });
}
bootstrap();
