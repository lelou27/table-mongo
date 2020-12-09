import { Injectable } from '@nestjs/common';
import { Chambre, ChambreDocument } from './schemas/chambre.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Chambre.name) private chambreModel: Model<ChambreDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getChambres(page = 1): Promise<Chambre[]> {
    if (page <= 0) page = 1;
    const pageSize = 10;
    const skip = pageSize * (page - 1);

    return this.chambreModel.find().skip(skip).limit(pageSize);
  }

  getDetail(id): Promise<Chambre> {
    return this.chambreModel.findById(id).exec();
  }

  async updateChambre(chambre: Chambre, id): Promise<Chambre> {
    return this.chambreModel.findByIdAndUpdate(id, chambre, { new: true });
  }

  async getElementsByDate(params, page) {
    if (!page) page = 1;
    const pageSize = 10;
    const skip = pageSize * (page - 1);

    if (params.operand === '>') {
      return this.chambreModel
        .find()
        .where('host_since')
        .gt(params.date)
        .skip(skip)
        .limit(pageSize);
    } else if (params.operand === '<') {
      return this.chambreModel
        .find()
        .where('host_since')
        .lt(params.date)
        .skip(skip)
        .limit(pageSize);
    } else {
      return this.chambreModel
        .find()
        .where('host_since')
        .equals(params.date)
        .skip(skip)
        .limit(pageSize);
    }
  }
}
