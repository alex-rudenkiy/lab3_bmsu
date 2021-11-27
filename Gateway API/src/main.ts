import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalService } from './utils/global.service';

async function bootstrap() {
  global.HOSTS = {
    "microService2":"https://library-system-alex.herokuapp.com", //
    "microService3":"https://reservation-system-alex.herokuapp.com", //
    "microService4":"https://rating-system-alex.herokuapp.com" //
  };
  const _ = ConfigModule.forRoot();

  const app = await NestFactory.create(AppModule);
  console.log(process.env.path);
  await app.listen(process.env.PORT || 4001);
}

bootstrap()
