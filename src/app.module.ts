import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './company/company.module';
import { EmployeesModule } from './employee/employee.module';
import { AuthModule } from './Auth/auth.module';
import { RootController } from './swagger.controller';
import { Companies, CompaniesSchema } from './company/company.Schema';
import Employee, { EmployeeSchema } from './employee/employee.Schema';
import { EmployeeSeedService } from './employee.seed.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dashboardApp'),
    MongooseModule.forFeature([
      { name: Companies.name, schema: CompaniesSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    CompaniesModule,
    EmployeesModule,
    AuthModule,
  ],
  controllers: [AppController, RootController],
  providers: [AppService, EmployeeSeedService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly employeeSeedService: EmployeeSeedService) {}

  async onApplicationBootstrap() {
    await this.employeeSeedService.seedEmployees();
  }
}
