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

  // Configure CORS
  const corsOrigins = configService.get<string>('CORS_ORIGINS') ?? '*';
  app.enableCors({
    origin: corsOrigins.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With',
    exposedHeaders: 'Content-Length,Content-Type',
    credentials: true,
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
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .addServer(
      `http://localhost:${process.env.PORT ?? configService.get<number>('PORT') ?? 3001}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup(`${apiPath}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
  });

  // Start the server
  const port = process.env.PORT ?? configService.get<number>('PORT') ?? 3001;
  await app.listen(port, '0.0.0.0');
  const serverUrl = `http://localhost:${port}`;
  console.log(`Application is running on: ${serverUrl}/${apiPath}`);
  console.log(
    `Swagger documentation is available at: ${serverUrl}/${apiPath}/docs`,
  );

  // Open the browser to the Swagger UI
  try {
    const { default: open } = await import('open');
    await open(`${serverUrl}/${apiPath}/docs`);
  } catch (_) {
    console.log(
      'Could not open browser automatically. Please open the URL manually.',
    );
  }
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
