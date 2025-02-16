import { Module, Provider } from '@nestjs/common';
import { MainController } from './main.controller';
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  HttpExceptionFilter,
  ZodValidationExceptionFilter,
} from '@app/@common/application/exceptions/filter';
import { ApiServerConfig } from '@core/@shared/infrastructure/config/env';
import { HttpLoggingInterceptor } from '@app/@common/application/interceptors/http-logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { TireModule } from '@app/tire/tire.module';
import { OrderModule } from './app/order/order.module';

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
    UsersModule,
    TireModule,
    OrderModule,
  ],
  controllers: [MainController],
  providers,
})
export class MainModule {}
