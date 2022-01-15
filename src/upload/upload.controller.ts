import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<User> {
    return this.uploadService.findOne(id);
  }

  @Post()
  create(@Body() createUser: User): Promise<User> {
    return this.uploadService.create(createUser);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.uploadService.delete(id);
  }

  @Put(':id')
  update(@Body() updateUser: User, @Param('id') id): Promise<User> {
    return this.uploadService.update(id, updateUser);
  }
}
