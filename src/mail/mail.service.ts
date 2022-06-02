import { MailerService } from '@nestjs-modules/mailer';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { Injectable } from '@nestjs/common';

type SendMialType = {
  to: string | Address;
  from?: string | Address;
  subject?: string;
  text?: string;
  html?: string;
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send({ to, from, subject, text, html }: SendMialType) {
    return this.mailerService.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });
  }
}
