import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  /* istanbul ignore next */
  console.log("Hey you");
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_USER);
  const app = await NestFactory.create(AppModule);
  /* istanbul ignore next */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // guarda el objeto SOLO con lo necesario
      // asi en el JSON yo envie mas datos de los encesarios,
      // solo obtiene los que yo tengo definidos en la clase de ese
      // tipo de objeto
      forbidNonWhitelisted: true, // me informa del error del envio
      // de un dato o atributo no necesario y que no tengo definido
    })
    );
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
