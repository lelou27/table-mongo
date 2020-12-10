import { Module } from '@nestjs/common';
import { UploadImgController } from './upload-img.controller';
import { UploadImgService } from './upload-img.service';

@Module({
  controllers: [UploadImgController],
  providers: [UploadImgService]
})
export class UploadImgModule {}
