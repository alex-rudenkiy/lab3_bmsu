import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
