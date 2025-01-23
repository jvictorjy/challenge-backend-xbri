import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { DatabaseModule } from "@app/@common/infrastructure/adapters/persistente/database/database.module";


@Module({
  imports: [DatabaseModule],
  controllers: [MainController],
  providers: [],
})
export class MainModule {}
