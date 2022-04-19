import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '/@/filter/error.filter';
import { TransoformInterceptor } from '/@/interceptor/transoform.interceptor';

import { APP, setupSwagger } from '/@/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  setupSwagger(app);

  await app.listen(APP.port);
}
bootstrap();
