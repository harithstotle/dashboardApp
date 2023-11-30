import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CompaniesDto } from './company.dto';
import { RolesGuard } from 'src/Auth/role.guard';
import { AuthenticatedGuard } from 'src/Auth/auth.guards';
import { Public } from 'src/Auth/decorator';
import { CompaniesService } from './company.service';
import { Multer } from 'multer';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  async addCompany(
    @UploadedFile() logo: Express.Multer.File,
    @Body() companyDto: CompaniesDto,
  ): Promise<{ id: string }> {
    // companyDto.logo = logo.filename;
    const generatedId = await this.companiesService.createCompany(companyDto);
    return { id: generatedId };
  }

  @Get('test')
  getStatus(): string {
    return this.companiesService.indicator();
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Get('allcompanies')
  async getCompanies() {
    const companies = await this.companiesService.getAllCompanies();
    return companies;
  }

  @Get(':id')
  getCourse(@Param('id') prodId: string) {
    return this.companiesService.getOneCompany(prodId);
  }
}
