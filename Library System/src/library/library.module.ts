import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { DatabaseModule } from '../DatabaseModule';
import { PaginateModule } from 'nestjs-sequelize-paginate/dist';

@Module({
  imports: [DatabaseModule],
  controllers: [LibraryController],
  providers: [LibraryService]
})
export class LibraryModule {}