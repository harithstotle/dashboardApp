import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import MongoStore from 'connect-mongo';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('setting up swagger...');
  setupSwagger(app);
  app.use(passport.initialize());
  app.use('/static', express.static('public'));
  await app.listen(3000);
}
bootstrap();
