import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@app/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../services/guard/authorization.guard';
import { UsersController } from '../controllers/users.controller';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(configService.getService('USER')),
      inject: [ConfigService],
    },
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(configService.getService('TOKEN')),
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class GatewayModule {}
