import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Global prefix
  const apiPath = configService.get<string>('API_PATH') ?? 'api';
  app.setGlobalPrefix(apiPath);

  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Accept,Authorization',
    exposedHeaders: 'Content-Length,Content-Type',
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation
  const apiTitle = configService.get<string>('API_TITLE') ?? 'API';
  const apiDescription =
    configService.get<string>('API_DESCRIPTION') ?? 'API Documentation';
  const apiVersion = configService.get<string>('API_VERSION') ?? '1.0';

  const config = new DocumentBuilder()
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .setVersion(apiVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPath}/docs`, app, document);

  // Start the server
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/${apiPath}`);
  console.log(
    `Swagger documentation is available at: http://localhost:${port}/${apiPath}/docs`,
  );
}

bootstrap();
