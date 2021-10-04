import {
  createResponse,
  IEmailData,
  IServiceResponse,
  mailerMessages,
} from '@app/common';
import { MailerService } from '@nest-modules/mailer';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomConfigService } from '../services/custom.config.service';
// import { CustomConfigService } from '../services/config.service';

const { sendMail } = mailerMessages();

@Controller('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly customConfigService: CustomConfigService,
  ) {}

  @MessagePattern(sendMail)
  mailSend(data: IEmailData): IServiceResponse {
    if (this.customConfigService.getIsDisabled()) {
      this.mailerService.sendMail(data);
    }

    return createResponse({ status: HttpStatus.ACCEPTED, name: sendMail });
  }
}
