import { Get, Controller, Render, Query } from '@nestjs/common';
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

    return await this.appService.getChambres(page);
  }
}
