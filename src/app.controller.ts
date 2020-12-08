import { Get, Controller, Render, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

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

  @Get(':id')
  @Render('detail')
  async getDetail(@Param('id') id) {
    return { data: await this.appService.getDetail(id) };
  }
}
