import { Module, Provider } from "@nestjs/common";
import { MainController } from './main.controller';
import { DatabaseModule } from "@app/@common/infrastructure/adapters/persistente/database/database.module";
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter, ZodValidationExceptionFilter } from "@app/@common/application/exceptions/filter";
import { ApiServerConfig } from "@core/@shared/infrastructure/config/env";
import { HttpLoggingInterceptor } from "@app/@common/application/interceptors/http-logging.interceptor";
import { ConfigModule } from "@nestjs/config";

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: ZodValidationExceptionFilter,
  },
];

if (ApiServerConfig.LOG_ENABLE) {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: HttpLoggingInterceptor,
  });
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [MainController],
  providers,
})
export class MainModule {}
