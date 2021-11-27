import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './DatabaseModule';
import { BookModule } from './book/book.module';
import { LibraryModule } from './library/library.module';
import { LibraryBooksModule } from './library-books/library-books.module';
import { PaginateModule } from 'nestjs-sequelize-paginate/dist';

@Module({
  imports: [DatabaseModule, BookModule, LibraryModule, LibraryBooksModule,
  //   PaginateModule.forRoot({
  //   url: 'http://localhost:3000',
  // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
