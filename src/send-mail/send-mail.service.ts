import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService) {}

  public example() {
    this.mailerService
      .sendMail({
        to: 'haiphamfec@gmail.com',
        subject: 'Testing Nest Mailermodule !!!',
        template: 'welcome', //CHÚ Ý FILE NÀY TRÙNG VỚI TEMPLATE/WELCOME Ở SRC
      })
      .then(() => {
        console.log('gui mail thanh cong !!!');
      })
      .catch(() => {
        console.log('gui mail that bai !!!');
      });
  }
}
