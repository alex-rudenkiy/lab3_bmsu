import { uuid } from 'uuidv4';

export class CreateBookDto {
  id: number|undefined;
  book_uid: string|undefined;
  name:string;
  author:string;
  genre:string;
  condition:string;
}
