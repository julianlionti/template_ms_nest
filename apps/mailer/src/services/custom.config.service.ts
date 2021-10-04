import { ConfigService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomConfigService {
  constructor(private configService: ConfigService) {}

  getIsDisabled() {
    return this.configService.get('MAILER_DISABLED');
  }

  getMailTransport() {
    return {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: this.configService.get('MAILER_MAIL'),
        pass: this.configService.get('MAILER_PASS'),
      },
    };
  }

  getMailFrom() {
    return this.configService.get('MAILER_FROM');
  }
}
