import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Employees from './employee/employee.Schema';
import Employee from './employee/employee.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class EmployeeSeedService {
  constructor(
    @InjectModel(Employees.name)
    private readonly employeeModel: Model<Employee>,
  ) {}

  async seedEmployees(): Promise<any> {
    const employeeData = {
      firstName: 'John',
      lastName: 'Doe',
      company: new mongoose.Types.ObjectId(),
      email: 'admin@admin.com',
      phone: '1234567890',
      password: 'password',
    };

    const newEmployee = new this.employeeModel(employeeData);
    await newEmployee.save();
  }
}
