import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Serve static files from the "client" directory
  app.useStaticAssets(join(__dirname, '..', 'client'));
  app.setBaseViewsDir(join(__dirname, '..', 'client'));

  await app.listen(3000);
}
bootstrap();
