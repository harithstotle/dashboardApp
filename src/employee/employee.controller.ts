import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  UsePipes,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './employee.dto';
import { UserValidationPipe } from './employee.pipes';
import { EmployeeDtoSchema } from './employee.dto.schema';
import { AuthenticatedGuard } from 'src/Auth/auth.guards';
import { Response } from 'express-serve-static-core';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Employees')
@Controller('employee')
export class EmployeesController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  @Get('allemployees')
  @HttpCode(200)
  async getEmployees(@Res() res: Response) {
    return res.json(await this.employeeService.getEmployee());
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UsePipes(new UserValidationPipe(EmployeeDtoSchema))
  async createEmployee(@Body() employee: EmployeeDto, @Res() res: Response) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.employeeService.createEmployee(employee));
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Delete()
  async deleteEmployee(@Body('id') id: string, @Res() res: Response) {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.employeeService.deleteEmployee(id));
  }
}
