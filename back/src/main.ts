import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'config/swagger.config';
import { config as dotenvConfig } from 'dotenv';
import { loggerGlobal } from './security/middlewares/logger.middleware';
import { DataEntryInterceptor } from './security/interceptors/data-entry.interceptor';
dotenvConfig({ path: './.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permitir todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
  });
  app.use(loggerGlobal);

  //app.use()
  console.log(
    `Server running on port http://localhost:${process.env.APP_PORT}`,
  );
  const apiDocumentation = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, apiDocumentation);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
