import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserInterface | null> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await this.comparePassword(pass, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async comparePassword(password: string, hash: string): Promise<any> {
    const isMatch = await bcrypt.compare(password, hash);

    /* if (!isMatch) {
      throw new Error('Email / Password incorrect');
    } */

    return isMatch;
  }

  async login(user: UserInterface): Promise<any> {
    const payload = { email: user.email, name: user.name };
    return { access_token: this.jwtService.sign(payload) };
  }
}
