import { Module } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
  controllers: [AppService],
})
export class AppModule {}
