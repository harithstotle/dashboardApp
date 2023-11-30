import {
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  Res,
  HttpStatus,
  Body,
  Request,
} from '@nestjs/common';

import { AuthenticatedGuard } from './auth.guards';
import { LocalAuthGuard } from './login.guards';
import { Response } from 'express-serve-static-core';
import { AuthService } from './auth.services';
import { LoginDto } from './login.dto';
import { LocalStrategy } from './Localstrategy';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): any {
    console.log('lets login');
    console.log(loginDto.email);
    return this.authservice.login(loginDto.email, loginDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Get('authorized')
  async getAuthenticatedUser(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ msg: 'Good' });
  }
}
