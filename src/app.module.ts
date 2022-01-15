import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UploadModule, MongooseModule.forRoot(config.mongoDbUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
