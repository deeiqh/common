import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientModule } from './modules/client.module';

@Module({
  imports: [ClientModule],
  controllers: [AppController],
})
export class AppModule {}
