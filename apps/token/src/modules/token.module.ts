import { ConfigModule, ConfigService } from '@app/common';
import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from '../controllers/token.controller';
import { Token, TokenSchema } from '../schemas/token.schema';
import { JwtConfigService } from '../services/jwt.config.service';
import { TokenService } from '../services/token.service';
import { MongoConfigService } from '../services/mongo.config.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [TokenController],
  providers: [ConfigService, TokenService],
})
export class TokenModule {}
