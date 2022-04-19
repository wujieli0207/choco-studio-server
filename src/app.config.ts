import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { argv } from 'yargs';

export const APP = {
  port: 8081,
};

export const MONGO_DB = {
  uri: (argv.db_uri as string) || 'mongodb://127.0.0.1:27017/ChocoStudio',
};

/**
 *
 * @description 设置 swagger 文档
 */
export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('俏可工作室后端文档')
    .setDescription('俏可工作室后端文档,包括移动端接口和管理后台接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // docs 为访问上下文
};
