import {
  Body,
  Controller,
  Get,
  Param,
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
import * as sharp from 'sharp';

@Controller('upload-img')
export class UploadImgController {
  constructor(private uploadImgService: UploadImgService) {}

  @Get('test/jeu')
  @Render('test')
  test() {
    return {};
  }

  @Get('/test')
  @Render('uplaodImage')
  async get(@Query('selected') selected, @Query('page') page) {
    let returnObject = {};

    if (selected) {
      returnObject = { selected: selected };
    }

    if (!page) page = 1;

    const images = await this.uploadImgService.getAll(page);
    returnObject = { ...returnObject, images: images };

    return returnObject;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Res() res: express.Response) {
    let filename = `${uniqid()}-${file.originalname}`;
    filename = filename.replace(' ', '');

    fs.writeFile(
      `public/${filename}`,
      await sharp(file.buffer).resize(200).toBuffer(),
      async (err) => {
        if (!err) {
          file.originalname = filename;
          await this.uploadImgService.saveImage(file);
        }

        res.redirect(`/upload-img/test/?selected=${filename}`);
      },
    );
  }

  @Post('/updatePredictions')
  updatePredictions(@Body() params) {
    this.uploadImgService.updatePredictions(params);
  }

  @Get('/delete/:id')
  async deleteData(@Param('id') id, @Res() res: express.Response) {
    await this.uploadImgService.deleteData(id);
    return res.redirect(`/upload-img/test`);
  }
}
