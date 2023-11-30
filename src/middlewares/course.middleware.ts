import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { Model } from 'mongoose';
import { Companies, CompaniesType } from 'src/company/company.Schema';

@Injectable()
export class ClassMiddleware implements NestMiddleware {
  @InjectModel(Companies.name)
  private readonly companiesModel: Model<CompaniesType>;

  async use(req: Request, res: Response, next: NextFunction) {
    const duplicate = await this.companiesModel.find({ code: req.body.code });

    if (duplicate.length > 0) {
      return res.send('This company already exists');
    }

    next();
  }
}
