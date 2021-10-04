import { Injectable } from '@nestjs/common';
import {
  MailerOptionsFactory,
  MailerOptions,
  HandlebarsAdapter,
} from '@nest-modules/mailer';

import * as path from 'path';
import { CustomConfigService } from './custom.config.service';
// import { CustomConfigService } from './config.service';

@Injectable()
export class MailerService implements MailerOptionsFactory {
  constructor(private configService: CustomConfigService) {}

  createMailerOptions(): MailerOptions {
    return {
      transport: this.configService.getMailTransport(),
      defaults: { from: this.configService.getMailFrom() },
      template: {
        dir: path.join(__dirname, '/services/templates/'),
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    };
  }
}
