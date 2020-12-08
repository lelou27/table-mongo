import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: this.appService.getHello() };
  }

  @Get("/:id")
  @Render('detail')
  detail() {
    return { message: this.appService.getHello() };
  }
}
