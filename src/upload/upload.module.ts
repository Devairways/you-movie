import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from 'src/schemas/video.schema';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
