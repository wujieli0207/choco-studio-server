import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransoformInterceptor } from './core/interceptor/transoform.interceptor';

import { APP } from '/@/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局路由前缀
  app.setGlobalPrefix('api');
  // 全局错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransoformInterceptor());
  // 全局注册管道
  app.useGlobalPipes(new ValidationPipe());

  // 设置 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('俏可工作室后端文档')
    .setDescription('俏可工作室后端文档,包括移动端接口和管理后台接口')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // docs 为访问上下文

  await app.listen(APP.port);
}
bootstrap();
