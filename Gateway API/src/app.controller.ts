import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Headers } from '@nestjs/common';
import { ReturnBookRequestDto } from './dto/return-book-request.dto';
import { TakeBookRequestDto } from './dto/take-book-request.dto';
import { Response } from 'express';
import axios from 'axios';
import { STATUS_CODES } from 'http';
import { GlobalService } from './utils/global.service';
import { MessageProducerService } from './utils/circuit_breaker/message.producer.service';
import { IRestTransaction } from './types/RestTransaction';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly messageProducerService:MessageProducerService) {}

  @Get("/api/v1/libraries/:libraryUid/books")
  getLibrariesOrBooksInLibraries(@Query('city') city: string|undefined, @Param('libraryUid') libraryUid: string|undefined, @Query('page') page: number, @Query('size') size: number, @Query('showAll') showAll:boolean|undefined): Promise<String> {
    return this.appService.getBooksInLibraries(libraryUid, page, size, showAll || false);
  }

  @Get("/api/v1/libraries")
  getLibs(@Query('city') city: string|undefined, @Query('page') page: number, @Query('size') size: number): Promise<string> {
    return this.appService.getLibraries(city, page, size);
  }

  @Get("/api/v1/reservations") //​ /api/v1/reservations
  async getReservations(@Headers('X-User-Name') userName: string, @Res() response: Response) {
    let res = (await this.appService.getReservations(userName));
    console.log("-->",res);
    response.status(200).send(res);
  }

  @Post("/api/v1/reservations")
  async postReservations(@Headers('X-User-Name') userName: string, @Body() data: TakeBookRequestDto, @Res() response: Response) {
    console.log(200);
    let res = (await this.appService.postReservations(userName, data));
    //console.log(res);
    response.status(200).send(res);
    //return this.appService.postReservations(userName, data);
  }

  @Post("/api/v1/reservations/:ReservationUid/return")
  @HttpCode(204)
  postReservationsReturn(@Headers('X-User-Name') userName: string, @Param('ReservationUid') reservationUid: string, @Body() data: ReturnBookRequestDto): Promise<String> {
    try{
      throw 'gg';
    }catch (e) {
      const t:IRestTransaction = { timeout: 3000, url: '/api/v1/reservations/:ReservationUid/return', type: 'POST', payload: {userName, reservationUid, data}};
      this.messageProducerService.reSendOnReservation(t);
    }
    return ;
    //return this.appService.postReservationsReturn(userName, reservationUid, data);
  }

  @Get("/api/v1/rating")
  getUserRating(@Headers('X-User-Name') username: string): Promise<String> {
    return this.appService.getUserRating(username);
  }


}
