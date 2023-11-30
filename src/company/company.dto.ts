import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CompaniesDto {
  name: string;
  email: string;
  logo?: string;
  websiteUrl: string;
}
