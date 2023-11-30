import mongoose, { Document, Mongoose } from 'mongoose';
import bcrypt from 'bcrypt';
import Employee from './employee.interface';

const saltRounds = 10;

export const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Companies',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'employees' },
);

EmployeeSchema.methods.hash = async function (
  password: string,
): Promise<string> {
  return bcrypt.hash(password, saltRounds);
};

EmployeeSchema.methods.compare = async function (
  pass: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(pass, hash);
};

const Employees = mongoose.model<Employee>('Employee', EmployeeSchema);
export default Employees;
