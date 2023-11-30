import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CompaniesController } from './company.controller';
import { CompaniesService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Companies, CompaniesSchema } from './company.Schema';
import { ClassMiddleware } from 'src/middlewares/course.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticatedGuard } from 'src/Auth/auth.guards';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Companies.name, schema: CompaniesSchema },
    ]),
    MulterModule.register({
      dest: './public/logos',
    }),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, ClassMiddleware, AuthenticatedGuard],
})
export class CompaniesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClassMiddleware)
      .forRoutes({ path: '*/create', method: RequestMethod.ALL });
  }
}
