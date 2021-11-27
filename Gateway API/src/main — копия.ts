import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalService } from './utils/global.service';

async function bootstrap() {
  global.HOSTS = {
    "microService2":"http://localhost:4002",
    "microService3":"http://localhost:4003",
    "microService4":"http://localhost:4004"
  };
  const _ = ConfigModule.forRoot();

  const app = await NestFactory.create(AppModule);
  console.log(process.env.path);
  await app.listen(process.env.PORT || 4001);
}

bootstrap()
