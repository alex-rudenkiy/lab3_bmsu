import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibraryBookDto } from './dto/create-library-book.dto';
import { UpdateLibraryBookDto } from './dto/update-library-book.dto';
import { uuid } from 'uuidv4';
import { Op } from 'sequelize';

@Injectable()
export class LibraryBooksService {
  @Inject('SEQUELIZE')
  private readonly seqClient: any;

  create(createLibraryBookDto: CreateLibraryBookDto) {
    return this.seqClient.models.reservation.build(createLibraryBookDto).save().then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  async findAll(libraryBookDto: any) {
    return (await this.seqClient.models.library_books.findAll({ where: libraryBookDto }))[0].dataValues;
  }


  async findByPage(libraryUid: string, page: number, size: number, showAll: boolean|undefined) {
    console.log((await this.seqClient.models.library.findOne({where: {library_uid: libraryUid}})).id);
    var result = await this.seqClient.models.library_books.findAndCountAll({
      where: {
        library_id: (await this.seqClient.models.library.findOne({where: {library_uid: libraryUid}})).id,
        available_count: {
          [Op.gt]: showAll==true ? 0 : -1
        }},
      limit: size,
      offset: (page-1) * size,
    });

    console.log();
    let mapped = [];
    for(let i=0; i<result.rows.length; i++){
      mapped.push(
        {

            bookUid: ((await this.seqClient.models.books.findByPk(result.rows[i].dataValues.book_id)).dataValues).book_uid,

            name: ((await this.seqClient.models.books.findByPk(result.rows[i].dataValues.book_id)).dataValues).name,
            author: ((await this.seqClient.models.books.findByPk(result.rows[i].dataValues.book_id)).dataValues).author,
            genre: ((await this.seqClient.models.books.findByPk(result.rows[i].dataValues.book_id)).dataValues).genre,
            condition: ((await this.seqClient.models.books.findByPk(result.rows[i].dataValues.book_id)).dataValues).condition,
            avaiblableCount: result.rows[i].dataValues.available_count

        });
    }
    //result = result.rows.map(e => this.seqClient.models.books.findByPk(e.dataValues.book_id));
    //console.log(result);({...{avaiblableCount: e.dataValues.available_count}, ...(

    return({
      page: Number(page),
      pageSize: result.rows.length,
      totalElements: result.count,
      items: mapped
    });
  }


  findOne(id: number) {
    return this.seqClient.models.library_books.findByPk(id).then(result => {
      if(result !== null){
        return result;
      } else {
        throw new NotFoundException("reservation is not founded");
      }
    });
  }



  update(id: number, updateLibraryBookDto: UpdateLibraryBookDto) {
    return this.seqClient.models.library_books.update(updateLibraryBookDto, { where: { id: id } }).then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  remove(id: number) {
    return this.seqClient.models.library_books.destroy({
      where: { id: id }
    });
  }
}
