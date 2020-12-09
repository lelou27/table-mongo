import {
  Get,
  Controller,
  Render,
  Query,
  Param,
  Patch,
  Redirect,
  Body,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as express from 'express';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  async root(@Query('page') page,@Query('sort') sort) {
    if (!page) {
      page = 1;
    }
    if (!sort) {
      sort = 1;
    }

    const chambres = await this.appService.getChambres(page,sort);
    return { data: chambres };
  }

  @Get(':id')
  @Render('detail')
  async getDetail(@Param('id') id) {
    return { data: await this.appService.getDetail(id) };
  }

  @Post('/updateOne')
  async updateChambre(@Body() chambre, @Res() res: express.Response) {
    await this.appService.updateChambre(chambre, chambre.id);

    return res.redirect(`/${chambre.id}`);
  }
}
