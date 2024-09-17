import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use()
  console.log(`Server running on port http://localhost:${3000}`);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('Ecommerce API description')
    .setVersion('1.0')
    .build();

    const apiDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, apiDocument);
  await app.listen(3000);
}
bootstrap();