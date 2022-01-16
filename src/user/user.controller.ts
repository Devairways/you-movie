import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  SingleUserResponse,
  User,
  UserArrayResponse,
} from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserArrayResponse> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<SingleUserResponse> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUser: User): Promise<SingleUserResponse> {
    return this.userService.create(createUser);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<SingleUserResponse> {
    return this.userService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateUser: User,
    @Param('id') id,
  ): Promise<SingleUserResponse> {
    return this.userService.update(id, updateUser);
  }
}
