import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class ReservationService {
  @Inject('SEQUELIZE')
  private readonly seqClient: any;

  async create(createReservationDto: CreateReservationDto) {
    createReservationDto.reservation_uid = uuid();
    console.log("----->", createReservationDto);
    let result = (await this.seqClient.models.reservation.build(createReservationDto).save()).dataValues;
    console.log(result);
    return result;
  }

  async findAll(params: any) {
    return this.seqClient.models.reservation.findAll({ where: params }).then(e => JSON.stringify(e));
  }

  findOne(id: number) {
    return this.seqClient.models.reservation.findByPk(id).then(result => {
      if(result !== null){
        return result;
      } else {
        throw new NotFoundException("reservation is not founded");
      }
    });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.seqClient.models.reservation.update(updateReservationDto, { where: { id: id } })
      .then(result => {
      if(result !== null){
        return result;
      } else {
        throw new BadRequestException();
      }
    });
  }

  remove(id: number) {
    return this.seqClient.models.reservation.destroy({
      where: { id: id }
    });
  }
}
