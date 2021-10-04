import { Module } from '@nestjs/common';
import { MailerController } from '../controllers/mailer.controller';
// import { CustomConfigService } from '../services/config.service';
import { MailerService } from '../services/mailer.service';
import { CustomConfigModule } from './custom.config.module';
// import { CustomConfigModule } from './config.module';

import { MailerModule as NestMailerModule } from '@nest-modules/mailer';

@Module({
  imports: [
    CustomConfigModule,
    NestMailerModule.forRootAsync({
      imports: [CustomConfigModule],
      useClass: MailerService,
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
