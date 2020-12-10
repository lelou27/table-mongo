import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageDocument, Image } from '../schemas/Image.schema';
import * as moment from 'moment';

@Injectable()
export class UploadImgService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async saveImage(file) {
    const image = new this.imageModel({
      date: moment().format('DD/MM/YYYY'),
      imgName: file.originalname,
      size: file.size,
      analyse: [],
    });
    return await image.save();
  }
}
