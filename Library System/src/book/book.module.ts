import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from '../DatabaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
