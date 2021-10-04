import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { Services } from '..';

export type EnvTypes = {
  NAME: string;
  API_GATEWAY_PORT: number;

  BASE_URL: string;
  DB_HOST?: string;
  DB_NAME?: string;
};

type ServiceRet = ClientOptions;

@Injectable()
export class ConfigService<K extends Record<string, unknown> = any> {
  constructor(public configService: NestConfigService<EnvTypes & K>) {}

  get(key: keyof K) {
    return this.configService.get(key);
  }

  getPort() {
    return this.configService.get('API_GATEWAY_PORT');
  }

  getGatewayPort() {
    return this.configService.get('API_GATEWAY_PORT');
  }

  getName() {
    return this.configService.get('NAME');
  }

  getBaseURL() {
    return this.configService.get('BASE_URL');
  }

  getDatabase() {
    const host = this.configService.get('DB_HOST');
    const name = this.configService.get('DB_NAME');
    const user = this.configService.get('DB_USER');
    const pass = this.configService.get('DB_PASS');
    if (!host || !name) throw Error('Database not configured');

    const connString = `${host}/${name}`;
    const userPlace = connString.indexOf('://') + 3;

    if (!user && !pass) return connString;
    //${user}:${pass}
    const txt2 =
      connString.slice(0, userPlace) +
      user +
      ':' +
      pass +
      '@' +
      connString.slice(userPlace) +
      '?authSource=admin';
    return txt2;
  }

  getService(name: Services): ServiceRet {
    const finalName = name.toUpperCase();
    return {
      options: {
        host: this.configService.get(
          `${finalName}_SERVICE_HOST` as keyof EnvTypes,
        ),
        port: this.configService.get(
          `${finalName}_SERVICE_PORT` as keyof EnvTypes,
        ),
      },
      transport: Transport.TCP,
    };
  }
}
