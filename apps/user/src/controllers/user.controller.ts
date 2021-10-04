import {
  ConfigService,
  createMailFromTemplate,
  mailerMessages,
  timeoutReq,
  userMessage,
} from '@app/common';
import { createResponse } from '@app/common/helpers/response';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { User } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

const { getById, getByUid } = userMessage();
const { sendMail } = mailerMessages();

@Controller('user')
export class UserController {
  constructor(
    private readonly appService: UserService,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
    private configService: ConfigService,
  ) {}

  @MessagePattern(getById)
  async getById(_id: string) {
    return createResponse({
      data: await this.appService.getById(_id),
      name: getById,
    });
  }

  @MessagePattern(getByUid)
  async getByUid(user: User) {
    const response = createResponse({
      data: await this.appService.getByUid(user),
      name: getByUid,
    });

    timeoutReq(
      this.mailerServiceClient,
      sendMail,
      createMailFromTemplate({
        to: 'racinglocura07@gmail.com',
        subject: 'From template',
        template: 'login',
        context: {
          name: user.displayName,
          url: this.configService.getBaseURL(),
        },
      }),
    );

    return response;
  }
}
