import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '../DatabaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
