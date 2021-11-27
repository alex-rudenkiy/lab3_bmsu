import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalService } from './utils/global.service';

async function bootstrap() {
  global.HOSTS = {
    "microService2":"http://localhost:4002", //https://library-system-alex.herokuapp.com
    "microService3":"http://localhost:4003", //https://reservation-system-alex.herokuapp.com
    "microService4":"http://localhost:4004" //https://rating-system-alex.herokuapp.com
  };
  const _ = ConfigModule.forRoot();

  const app = await NestFactory.create(AppModule);
  console.log(process.env.path);
  await app.listen(process.env.PORT || 4001);
}

bootstrap()
