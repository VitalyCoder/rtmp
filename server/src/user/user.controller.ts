import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'prisma/generated';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUserById(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Post('create')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }
}
