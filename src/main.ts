import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './general/exception.filter';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { PackageInterceptor } from './general/package.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new PackageInterceptor());

  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: ['https://localhost:3030'],
      credentials: true,
    });
  } else {
    app.enableCors({ origin: true, credentials: true });
  }

  const config = new DocumentBuilder()
    .setTitle('xcare_nest API')
    .setDescription('xcare_nest 개발을 위한 API 문서')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: { httpOnly: true },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
}
bootstrap();
