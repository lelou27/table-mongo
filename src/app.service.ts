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
    const pageSize = 20;
    const skip = pageSize * (page - 1);

    return this.chambreModel.find().skip(skip).limit(pageSize);
  }

  getDetail(id): Promise<Chambre> {
    return this.chambreModel.findById(id).exec();
  }

  async updateChambre(chambre: Chambre, id): Promise<Chambre> {
    return await this.chambreModel
      .findByIdAndUpdate(id, chambre, { new: true })
      .exec();
  }
}
