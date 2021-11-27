import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class RatingService {
  @Inject('SEQUELIZE')
  private readonly seqClient: any;

  create(createRatingDto: CreateRatingDto) {
    return this.seqClient.models.rating.build(createRatingDto).save().then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  findAll(username: string) {
    //console.log(this.seqClient.models.rating.findAll({where: {username: username}}).then(e=>console.log(e)));
    return this.seqClient.models.rating.findAll({where: {username: username}});
  }

  findOne(id: number) {
    return this.seqClient.models.rating.findByPk(id).then(result => {
      if(result !== null){
        return result;
      } else {
        throw new NotFoundException("book is not founded");
      }
    });
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    console.log("--->",id, updateRatingDto);
    return this.seqClient.models.rating.update(updateRatingDto, { where: { id: id } })
      .then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  remove(id: number) {
    return this.seqClient.models.rating.destroy({
      where: { id: id }
    });
  }
}
