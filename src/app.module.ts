import { Module } from '@nestjs/common';
import { EventEmitter } from 'events';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService, EventEmitter],
})
export class AppModule {}
