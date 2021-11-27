import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe, Res, HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Pagination } from 'nestjs-typeorm-paginate/index';
import { PaginateQuery, PaginateQueryInterface, PaginateService } from 'nestjs-sequelize-paginate/dist';
import { Request } from 'express';

@Controller('/api/v1/library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @Get()
  findAll(@Query('city') city: string|undefined,
          @Query('page') page: number|undefined,
          @Query('size') size: number|undefined,
          @Req() request: Request) {
    if(page===undefined) return this.libraryService.findAll({...request.params, ...request.query});
    return this.libraryService.findByPage(city, page, size);
  }


  // @Get()
  // async getUsers(
  //   @Res() res: Response,
  //   @PaginateQuery('all') paginateQuery: PaginateQueryInterface,
  // ): Promise<any> {
  //   const data = await this.libraryService.findAll(paginateQuery);
  //   res.status(HttpStatus.OK).send(data);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }
}
