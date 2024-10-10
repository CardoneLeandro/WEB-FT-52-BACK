import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'config/swagger.config';
import { config as dotenvConfig } from 'dotenv';
import { UserBannedRestriction } from './security/middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
dotenvConfig({ path: './.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permitir todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
  });

  app.use(UserBannedRestriction)

  const apiDocumentation = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, apiDocumentation);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.APP_PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
