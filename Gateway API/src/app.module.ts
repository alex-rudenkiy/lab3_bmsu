import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MessageProducerService } from './utils/circuit_breaker/message.producer.service';
import { MessageConsumer } from './utils/circuit_breaker/message.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
    BullModule.registerQueue({
      name:'message-queue'
    })

  ],
  controllers: [AppController],
  providers: [AppService, MessageProducerService, MessageConsumer],
  exports: [AppService]
})
export class AppModule {}
