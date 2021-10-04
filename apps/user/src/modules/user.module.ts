import { ConfigModule, ConfigService } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../controllers/user.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { MongoConfigService } from '../services/mongo.config.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    ConfigService,
    UserService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(configService.getService('MAILER')),
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
