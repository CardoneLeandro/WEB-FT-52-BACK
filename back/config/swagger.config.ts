import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('PF FT-52 CONGREGACIÓN JUVENIL PEREGRINOS BACKEND')
.setDescription('Ecommerce API description')
.setVersion('1.0')
.build();

