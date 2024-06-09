import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { HttpExceptionFilter } from './filters/exception.filter';
import session from 'express-session';

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.File({
          filename: 'log/server.log',
          format: format.combine(format.timestamp(), format.json())
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level} - ${info.message}`
            })
          )
        })
      ]
    })
  });

  app.use(cookieParser(process.env.SECRET_KEY_COOKIES))
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
