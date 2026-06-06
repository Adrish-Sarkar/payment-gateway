import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/exception/http-exception.filter';

async function bootstrap() {
  // 1. Initialize NestJS application using the Root Module
  const app = await NestFactory.create(AppModule);

  // 2. Apply the Global Exception Filter (catches all unhandled errors application-wide)
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 3. Enable Global Validation (forces NestJS to inspect DTOs using class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strips out any extra fields not defined in your DTO
      transform: true, // Automatically converts payloads to match DTO instances
    }),
  );

  // 4. Start listening on port 3000
  console.log('🚀 Server running smoothly on http://localhost:3000');
  await app.listen(3000);
}
bootstrap();