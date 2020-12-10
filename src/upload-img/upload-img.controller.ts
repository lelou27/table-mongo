import {
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImgService } from './upload-img.service';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import * as fs from 'fs';
import * as uniqid from 'uniqid';
import * as express from 'express';

@Controller('upload-img')
export class UploadImgController {
  constructor(private uploadImgService: UploadImgService) {}

  @Get('/test')
  @Render('uplaodImage')
  get(@Query('selected') selected) {
    if (selected) {
      return { selected: selected };
    }
    return {};
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Res() res: express.Response) {
    let filename = `${uniqid()}-${file.originalname}`;
    filename = filename.replace(' ', '');

    fs.writeFile(`public/${filename}`, file.buffer, async (err) => {
      if (!err) {
        file.originalname = filename;
        await this.uploadImgService.saveImage(file);
      }

      res.redirect(`/upload-img/test/?selected=${filename}`);
    });
  }
}
