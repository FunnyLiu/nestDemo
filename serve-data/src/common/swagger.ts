import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
    .setTitle('NestJS serve-data API')
    .setDescription('The API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
export const initSwagger = (app:any) => {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
}
