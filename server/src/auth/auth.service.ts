import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(data: {
    username: string;
    password: string;
  }): Promise<{ username: string }> {
    const user = await this.userService.findOne(data.username);
    if (!user) throw new BadRequestException();

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return { username: user.username };
  }

  async register(data: {
    username: string;
    password: string;
  }): Promise<{ username: string }> {
    const candidate = await this.userService.findOne(data.username);
    if (candidate) throw new BadRequestException();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userService.createUser({
      ...data,
      password: hashedPassword,
    });
    if (!user) throw new BadRequestException();
    return { username: user.username };
  }
}
