import {
  Get,
  Controller,
  Render,
  Query,
  Param,
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
  async root(@Query('page') page) {
    if (!page) {
      page = 1;
    }

    const chambres = await this.appService.getChambres(page);
    return { data: chambres };
  }

  @Post('/getElementsByDate')
  @Render('index')
  async tri(@Body() params) {
    if (!params.page) params.page = 1;
    const chambres = await this.appService.getElementsByDate(
      params,
      params.page,
    );
    return { data: chambres, page: params.page + 1, date: params.date };
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
