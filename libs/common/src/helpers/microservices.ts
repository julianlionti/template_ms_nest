import { NestFactory } from '@nestjs/core';
import { Services } from '../interfaces/services.interface';
import { ConfigService } from '../services/config.service';

export const bootstrap = async (name: Services, module: any) => {
  const app = await NestFactory.create(module);
  const configService = app.get(ConfigService);

  const options = configService.getService(name);
  console.log(options);
  app.connectMicroservice(options);
  await app.startAllMicroservices();

  console.log(
    `${configService.getName()}-${name} on port: ${
      (options.options as any).port
    }`,
  );
};
