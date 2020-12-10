import { Module } from '@nestjs/common';
import { UploadImgController } from './upload-img.controller';
import { UploadImgService } from './upload-img.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, Image } from '../schemas/Image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [UploadImgController],
  providers: [UploadImgService],
})
export class UploadImgModule {}
