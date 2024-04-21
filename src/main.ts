import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/guards/auth.guard';

async function bootstrap() {
  console.log("Hey you");
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_USER);
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
