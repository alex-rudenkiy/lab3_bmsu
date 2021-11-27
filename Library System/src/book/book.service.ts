import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class BookService {
  @Inject('SEQUELIZE')
  private readonly seqClient: any;

  create(createBookDto: CreateBookDto) {
    return this.seqClient.models.books.build({
      ...createBookDto,
      ...{
        book_uid: createBookDto?.book_uid ? createBookDto.book_uid : uuid(),
      }
    }).save().then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  findAll(data:any) {
    return this.seqClient.models.books.findAll({where: data});
  }

  findOne(id: number) {
    return this.seqClient.models.books.findByPk(id).then(result => {
      if(result !== null){
        return result;
      } else {
        throw new NotFoundException("book is not founded");
      }
    });
  }

  update(id: number, updateBookDto: any) {
    console.log(id, updateBookDto);
    return this.seqClient.models.books.update(updateBookDto, { where: { id: id } });
  }

  remove(id: number) {
    return this.seqClient.models.books.destroy({
      where: { id: id }
    });
  }
}