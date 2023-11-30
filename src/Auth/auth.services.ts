import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Employee from 'src/employee/employee.interface';
// import User from 'src/employee/employee.interface';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Employee | null> {
    const user = await this.employeeService.findOne(email);
    console.log('found', email);
    // if (user && (await user.compare(password, user.password))) {
    //   const { password, firstName, email, ...userWithoutPassword } =
    //     user.toObject();
    //   return userWithoutPassword as Employee;
    // }
    console.log('validated user:', user);
    return user;
  }

  async login(email: string, password: string) {
    console.log(email);
    const user = await this.validateUser(email, password);
    console.log('user:', user);

    if (!user) {
      // Handle unsuccessful login (optional)
      console.log('unauthorized');
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user._id };
    console.log(payload);
    console.log('logging in');

    return {
      user: {
        email: user.email,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
