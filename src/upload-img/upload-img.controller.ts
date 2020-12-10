import {
  Body,
  Controller,
  Get,
  Patch,
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
  async get(@Query('selected') selected, @Query('page') page) {
    let returnObject = {};

    if (selected) {
      returnObject = { selected: selected };
    }

    if (!page) page = 1;

    const images = await this.uploadImgService.getAll(page);
    returnObject = { ...returnObject, images: images}

    return returnObject;
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

  @Post('/updatePredictions')
  async updatePredictions(@Body() params) {
    console.log('okokokokokkooko');
    console.log(params);
  }
}
