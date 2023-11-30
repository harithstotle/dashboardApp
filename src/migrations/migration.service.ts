import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompaniesType } from 'src/company/company.Schema';
import Employee from 'src/employee/employee.interface';

@Injectable()
export class MigrationService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<CompaniesType>,
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async runMigrations(): Promise<void> {
    await this.createCollections();
  }

  private async createCollections(): Promise<void> {
    await this.companyModel.createCollection();
    await this.employeeModel.createCollection();
  }
}
