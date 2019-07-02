import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = config.get('server');

  await app.listen(process.env.PORT || port);
  console.log(`Server started and listening @ port: ${port}`);
}
bootstrap();
