import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { IRestTransaction } from '../../types/RestTransaction';
import { Dependencies } from '@nestjs/common';
import { AppService } from '../../app.service';
import { MessageProducerService } from './message.producer.service';

@Processor('message-queue')
@Dependencies(AppService)
export class MessageConsumer {
  constructor(private readonly appService: AppService) {}

  @Process('message-resend-reservation')
  async readOperationJob(job: Job<IRestTransaction>) {
    console.log(job);
    let trying = 0;

    while (true) {
      console.log('Попытка №' + trying++);
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms)).then(() => console.log('ura'))
      await delay(job.data.timeout);
      try {
        await this.appService.postReservationsReturn(job.data.payload['userName'], job.data.payload['reservationUid'], job.data.payload['data']);
        return;
      } catch (e) {
        console.log('Запрос накрылся');
      }
    }
  }
}