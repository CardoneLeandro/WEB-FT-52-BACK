import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: './.env' });

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
}
