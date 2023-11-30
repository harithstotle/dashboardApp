import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { employeeProviders } from './employee.provider';
import { EmployeesController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { DatabaseModule } from 'src/Database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [EmployeesController],
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService],
})
export class EmployeesModule {}
