import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { LibraryBooksService } from './library-books.service';
import { CreateLibraryBookDto } from './dto/create-library-book.dto';
import { UpdateLibraryBookDto } from './dto/update-library-book.dto';
import { Request } from 'express';

@Controller('/api/v1/library-books')
export class LibraryBooksController {
  constructor(private readonly libraryBooksService: LibraryBooksService) {}

  @Post()
  create(@Body() createLibraryBookDto: CreateLibraryBookDto) {
    return this.libraryBooksService.create(createLibraryBookDto);
  }

  @Get()
  findAll(@Query('libraryUid') libraryUid: string,
          @Query('page') page: number,
          @Query('size') size: number,
          @Query('showAll') showAll: boolean|undefined,
          @Req() request: Request) {
    console.log(libraryUid, page, size, showAll, {...request.params, ...request.query});
    if(page===undefined) return this.libraryBooksService.findAll({...request.params, ...request.query});
    return this.libraryBooksService.findByPage(libraryUid, page, size, showAll);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryBooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibraryBookDto: UpdateLibraryBookDto) {
    console.log(updateLibraryBookDto);
    return this.libraryBooksService.update(+id, updateLibraryBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryBooksService.remove(+id);
  }
}
