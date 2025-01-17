import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { SendMailService } from './send-mail/send-mail.service';

@Controller()
export class AppController {
    constructor(
    private readonly appService: AppService,
    private sendMail: SendMailService,
  ) {}

  @Get('')
  @Render('index')
  getHello() {
    this.sendMail.example();
    return { name: 'nguyen Van A' };
  }
}
