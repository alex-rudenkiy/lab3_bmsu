export class CreateReservationDto {
  id: number|undefined;
  reservation_uid: string;
  username: string;
  book_uid: string;
  library_uid: string;
  status: string;
  start_date: string;
  till_date: string;
}
