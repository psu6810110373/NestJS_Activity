import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //3.1

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //Setค่า GLobal API
  app.useGlobalPipes(new ValidationPipe()); //3.1
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
