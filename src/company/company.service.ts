import { Injectable, NotFoundException } from '@nestjs/common';
import { Companies, CompaniesType } from './company.Schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { request } from 'http';
import { CompaniesDto } from './company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Companies.name)
    private readonly companiesModel: Model<CompaniesType>,
  ) {}

  indicator(): string {
    return 'Service working';
  }

  async createCompany(companiesDto: CompaniesDto) {
    const newCompany = new this.companiesModel(companiesDto);
    const result = await newCompany.save();
    return result.id as string;
  }

  async getAllCompanies() {
    const courses = await this.companiesModel.find().exec();
    return courses as Companies[];
  }

  async getOneCompany(companyId: string) {
    const company = await this.findCompany(companyId);
    return {
      name: company.name,
      email: company.email,
      website: company.websiteUrl,
    };
  }

  private async findCompany(id: string): Promise<Companies> {
    let company;
    try {
      company = await this.companiesModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find company');
    }
    if (!company) {
      throw new NotFoundException('Could not find company');
    }
    return company;
  }
}
