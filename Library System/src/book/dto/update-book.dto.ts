import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto {
  id: number|undefined;
  book_uid: string|undefined;
  name:string;
  author:string;
  genre:string;
  condition:string;
}