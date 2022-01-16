import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Video } from 'src/interfaces/video.interface';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  findAll(): Promise<Video[]> {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Video> {
    return this.uploadService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Video> {
    return this.uploadService.delete(id);
  }

  @Put(':id')
  update(@Body() updateVideo: Video, @Param('id') id): Promise<Video> {
    return this.uploadService.update(id, updateVideo);
  }
}
