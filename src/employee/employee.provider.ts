import { Connection } from 'mongoose';
import { EmployeeSchema } from './employee.Schema';

export const employeeProviders = [
  {
    provide: 'EMPLOYEE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Employee', EmployeeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
