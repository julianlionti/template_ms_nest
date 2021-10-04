import { ConfigService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GatewayModule } from './modules/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix('api');
  const swagger = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('Use examples for API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('docs', app, document);

  const config = app.get(ConfigService);
  const gateWayPort = config.getGatewayPort();
  if (!gateWayPort) throw Error('API_GATEWAY_PORT not foun in .env file');

  await app.listen(gateWayPort, () => {
    console.log(`${config.getName()} running on PORT ${gateWayPort}`);
  });

  console.log('Esta sería una prueba de que las cosas están andando peola');
}
bootstrap();
