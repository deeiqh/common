import { CacheModule, Module } from '@nestjs/common';
import { EventEmitter } from 'events';
import { AppController } from './app.controller';
import { AppService, OTP_OPERATION_MAX_MINUTES } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: OTP_OPERATION_MAX_MINUTES * 60 * 1000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EventEmitter],
})
export class AppModule {}
