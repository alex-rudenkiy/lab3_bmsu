import { Module } from '@nestjs/common';
import { LibraryBooksService } from './library-books.service';
import { LibraryBooksController } from './library-books.controller';
import { DatabaseModule } from '../DatabaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [LibraryBooksController],
  providers: [LibraryBooksService]
})
export class LibraryBooksModule {}
