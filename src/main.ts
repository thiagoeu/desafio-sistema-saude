import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Config
import { setupSwagger } from './config/swagger.config';
import { corsConfig } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Global CORS
  app.enableCors(corsConfig);

  // Swagger
  setupSwagger(app);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
