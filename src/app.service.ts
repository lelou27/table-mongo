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

  async getChambres(page = 1,sort = "true"): Promise<Chambre[]> {
    if (page <= 0) page = 1;
    let sortValue = 1;
    if (sort === "false"){
      sortValue = -1
    }
    const pageSize = 10;
    const skip = pageSize * (page - 1);

    return this.chambreModel.find().skip(skip).limit(pageSize).sort({host_since : sortValue});
  }

  getDetail(id): Promise<Chambre> {
    return this.chambreModel.findById(id).exec();
  }

  async updateChambre(chambre: Chambre, id): Promise<Chambre> {
    console.log('okokokok');
    console.log(chambre);
    return this.chambreModel.findByIdAndUpdate(id, chambre, { new: true });
  }

  async deleteChambre(id) {
    return this.chambreModel.deleteOne({ _id: id });
  }
}
