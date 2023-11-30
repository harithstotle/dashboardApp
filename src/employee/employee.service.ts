import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { EmployeeDto } from './employee.dto';
import User from './employee.interface';
import Employee from './employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_MODEL') private employeeModel: Model<Employee>,
  ) {}

  async findOne(email: string): Promise<Employee | null> {
    try {
      console.log('finding email...');
      console.log('the email:', email);
      const employee = await this.employeeModel.findOne({ email }).exec();
      console.log('Employee found by email:', employee);
      return employee;
    } catch (error) {
      console.error(`Error finding user by email: ${error.message}`);
      return null;
    }
  }

  async getEmployee() {
    return this.employeeModel.find();
  }

  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    try {
      const findUser = await this.employeeModel.findOne({
        email: employee.email,
      });
      if (findUser) {
        throw new HttpException(
          {
            message: 'Cannot create user',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      const newUser = await this.employeeModel.create({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        password: employee.password,
        company: employee.company,
        phone: employee.phone,
      });
      // newUser.password = await newUser.hash(newUser.password);
      newUser.save();
      return newUser;
    } catch (err) {
      return err;
    }
  }

  async deleteEmployee(id: string) {
    try {
      await this.employeeModel.deleteOne({ _id: id });
      return { message: 'Success' };
    } catch (err) {
      return { error: 'Something went wrong.' };
    }
  }

  async findUser(email: string): Promise<Employee> {
    return this.employeeModel.findOne({ email });
  }
}
