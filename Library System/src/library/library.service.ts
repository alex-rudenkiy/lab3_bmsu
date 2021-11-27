import { BadRequestException, Inject, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { uuid } from 'uuidv4';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate/index';
import { PaginateService, PaginateOptions } from 'nestjs-sequelize-paginate';
import { rejects } from 'assert';

@Injectable()
export class LibraryService {
  @Inject('SEQUELIZE')
  private readonly seqClient: any;

  create(createLibraryDto: CreateLibraryDto) {
    return this.seqClient.models.library.build().save().then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  // async findAll(options: PaginateOptions): Promise<any> {
  //   const paginate = this.seqClient.models.library.findAllPaginate({
  //     ...options,
  //     model: CreateLibraryDto,
  //     path: '/user',
  //   });
  //   return paginate;
  // }
  async findAll(params: any) {
    console.log(params, (await this.seqClient.models.library.findAll({where:params}))[0].dataValues);
    return (await this.seqClient.models.library.findAll({where:params}))[0].dataValues;
  }

  async findByPage(city: string, page: number, size: number) {
    var result = await this.seqClient.models.library.findAndCountAll({
      where: { city: city },
      limit: size,
      offset: (page-1) * size,
    });
    console.log(result);
    return({
      page: Number(page),
      pageSize: result.rows.length,
      totalElements: result.count,
      items: result.rows.map(e=>
        (
          {
            libraryUid: e.dataValues.library_uid,
            name: e.dataValues.name,
            address: e.dataValues.address,
            city: e.dataValues.city
          }
        )
      )
    });
  }


  findOne(id: number) {
    return this.seqClient.models.library.findByPk(id).then(e => {
      if(e !== null){
        return ({
          libraryUid: e.library_uid,
          name: e.dataValues.name,
          address: e.dataValues.address,
          city: e.dataValues.city
        });
      } else {
        throw new NotFoundException("library is not founded");
      }
    });
  }

  update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return this.seqClient.models.library.update(updateLibraryDto, { where: { id: id } }).then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  remove(id: number) {
    return this.seqClient.models.books.destroy({ where: { id: id } });
  }
}
