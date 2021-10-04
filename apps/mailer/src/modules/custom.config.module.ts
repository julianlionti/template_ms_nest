import { ConfigModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CustomConfigService } from '../services/custom.config.service';

@Module({
  imports: [ConfigModule],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
