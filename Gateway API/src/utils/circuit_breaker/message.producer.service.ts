import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IRestTransaction } from '../../types/RestTransaction';
import { AppService } from '../../app.service';

@Injectable()
export class MessageProducerService {
  constructor(@InjectQueue('message-queue') private queue: Queue) {}

  async reSendOnReservation(message:IRestTransaction){
    await this.queue.add('message-resend-reservation', message);
  }
}
