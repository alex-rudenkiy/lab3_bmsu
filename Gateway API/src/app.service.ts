import {
  BadRequestException,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import axios from 'axios';
import { query } from 'express';
import { stringify } from 'querystring';
import { ReturnBookRequestDto } from './dto/return-book-request.dto';
import { TakeBookRequestDto } from './dto/take-book-request.dto';
import { Response } from 'express';
import { MessageProducerService } from './utils/circuit_breaker/message.producer.service';
import { IRestTransaction } from './types/RestTransaction';

@Injectable()
export class AppService {
  constructor(private readonly messageProducerService:MessageProducerService) {}

  async getLibraries(city: string, page: number, size: number): Promise<any> {
    console.log("hello", city, page, size, "|", global.HOSTS.microService2+`/api/v1/library?city=${city}&page=${page}&size=${size}`);
    return (await axios.get(encodeURI(global.HOSTS.microService2+`/api/v1/library?city=${city}&page=${page}&size=${size}`))).data;//axios.get(global.HOSTS.microService2+`/library?city=${city}&page=${page}&size=${size}`);
  }

  async getBooksInLibraries(libraryUid: string, page: number, size: number, showAll:boolean|undefined): Promise<any> {
    console.log(libraryUid, page, size, showAll);
    return (await axios.get(encodeURI(global.HOSTS.microService2+`/api/v1/library-books?libraryUid=${libraryUid}&page=${page}&size=${size}&showAll=${showAll}`))).data;
  }

  async getReservations(userName: string): Promise<any> {
    const moment = require('moment-timezone');

    var res = <Array<any>>(await axios.get(global.HOSTS.microService3+`/api/v1/reservation?username=${userName}&status=RENTED`)).data;

    let resp : Array<any> = [];

    //console.log(res[0]["book_uid"]);
    for (let i=0; i<res.length; i++){
      let e = res[i];
      let library = (await axios.get(global.HOSTS.microService2+`/api/v1/library?library_uid=${e["library_uid"]}`)).data;
      let book = (await axios.get(global.HOSTS.microService2+`/api/v1/book?book_uid=${e['book_uid']}`)).data[0];
      resp.push(
        {
          reservationUid:e["reservation_uid"],
          status: e["status"],
          startDate: moment(e["start_date"]).format("YYYY-MM-DD"),
          tillDate: moment(e["till_date"]).format("YYYY-MM-DD"),
          book:{
            bookUid: book['book_uid'],
            name:book['name'],
            author:book['author'],
            genre:book['genre'],
          },
          library:{
            libraryUid:library["library_uid"],
            name:library["name"],
            city:library["city"],
            address:library["address"],
          }
        })
    }

    console.log("*-*-*->",resp);
    return new Promise((resolve, reject)=>resolve(resp));//axios.get(global.HOSTS.microService3+`/api/v1/reservation?username=${userName}`);
  }

  async postReservations(userName: string, data: TakeBookRequestDto): Promise<any> {
    try {


      const moment = require('moment-timezone');
      let userRecords: Array<any>;

      let t = (await axios.get(global.HOSTS.microService3 + `/api/v1/reservation?username=${userName}`));
      userRecords = t.data as Array<any>;

      //console.log(global.HOSTS.microService2+`/api/v1/library?library_id=${data.libraryUid}`);
      let library = (await axios.get(global.HOSTS.microService2 + `/api/v1/library?library_uid=${data.libraryUid}`)).data;


      let book = (await axios.get(global.HOSTS.microService2 + `/api/v1/book?book_uid=${data.bookUid}`)).data[0];

      let libraryBooksId = (await axios.get(global.HOSTS.microService2 + `/api/v1/library-books?library_id=${library["id"]}&book_id=${book["id"]}`)).data;//.data["id"]

      if (libraryBooksId['available_count'] <= 0) {
        throw new BadRequestException("Книги кончились");
      }

      (await axios.patch(global.HOSTS.microService2 + `/api/v1/library-books/${libraryBooksId['id']}`, { available_count: libraryBooksId['available_count'] - 1 })).data;

      //let userStars = -1;
      // try {
      let user = (await axios.get(global.HOSTS.microService4 + `/api/v1/rating?username=${userName}`)).data[0];
      let userStars = user["stars"];
      // }catch (e) {}


      console.log(userRecords.filter(x => x.status == "RENTED").length, userStars);
      if (userRecords.filter(x => x.status == "RENTED").length >= userStars)
        throw new BadRequestException("Лимит исчерпан");

      console.log(data.tillDate);
      var date = moment(data.tillDate).tz('Europe/Moscow').format('YYYY-MM-DD 05:mm');

      var payload = {
        username: userName,
        start_date: new Date().toISOString(),
        status: "RENTED",
        book_uid: data.bookUid,
        library_uid: data.libraryUid,
        till_date: date
      };

      console.log(payload)
      let res = (await axios.post(global.HOSTS.microService3 + `/api/v1/reservation`, payload)).data;
      res["reservationUid"] = res["reservation_uid"];
      res["startDate"] = moment(res["start_date"]).format("YYYY-MM-DD");
      res["tillDate"] = moment(res["till_date"]).format("YYYY-MM-DD");
      res["book"] = book;
      res["library"] = library;
      res["book"]["bookUid"] = res['book_uid'];
      res["library"]["libraryUid"] = res['library_uid'];

      console.log(res);//
      return res;//axios.post(global.HOSTS.microService3+`/api/v1/reservation`, payload);
    }catch (e) {
      throw new HttpException('Bonus Service unavailable', 503);
    }
  }

  async postReservationsReturn(userName: string, reservationUid: string, data: ReturnBookRequestDto): Promise<any> {
    try {
      let reserv = (await axios.get(global.HOSTS.microService3 + `/api/v1/reservation?reservation_uid=${reservationUid}`)).data[0];
      console.log(reserv['book_uid']);
      let book = (await axios.get(global.HOSTS.microService2 + `/api/v1/book?book_uid=${reserv.book_uid}`)).data[0];

      console.log(book);
      let newStatus = "EXPIRED";
      if (new Date() > new Date(reserv.till_date)) {
        newStatus = 'RETURNED';
        const newStars = (await axios.get(global.HOSTS.microService4 + `/api/v1/rating?username=${userName}`)).data[0].stars + 1;
        console.log("newRating = ", newStars);
        axios.patch(global.HOSTS.microService4 + `/api/v1/rating/${(await axios.get(global.HOSTS.microService4 + `/api/v1/rating?username=${userName}`)).data[0].id}`, { stars: newStars });
      }

      await axios.patch(global.HOSTS.microService2 + `/api/v1/book/${book['id']}`, { condition: data.condition });//
      let res = (await axios.patch(global.HOSTS.microService3 + `/api/v1/reservation/${reserv['id']}`, { status: newStatus })).data;//
      return res;
    }catch (e) {
      const t:IRestTransaction = { timeout: 3000, url: '/api/v1/reservations/:ReservationUid/return', type: 'POST', payload: {userName, reservationUid, data}};
      this.messageProducerService.reSendOnReservation(t);
      throw new HttpException('Bonus Service unavailable', 204);
    }

    //return axios.get('http://localhost:4003/reservation/rating');
  }

  async getUserRating(username: string): Promise<any> {
    try{
      return (await axios.get(global.HOSTS.microService4+`/api/v1/rating?username=${username}`)).data[0];
    }catch (e) {
      throw new HttpException('Bonus Service unavailable', 503);
    }
  }
}
