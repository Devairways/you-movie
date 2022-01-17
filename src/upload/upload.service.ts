import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from 'src/interfaces/video.interface';
import { readFileSync, writeFileSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class UploadService {
  constructor(
    @InjectModel('Video') private readonly videoModel: Model<Video>,
  ) {}

  private makeVideoScreenShot(videoPath: any) {
    ffmpeg(videoPath)
      .seekInput('00:00.03')
      .output('./src/tempFolder/screenshot.jpg')
      .outputOptions(
        '-frames',
        '1', // Capture just one frame of the video
      )
      .on('end', function () {
        console.log('Screenshot taken');
      })
      .run();
  }

  private writeAndReadTempFolder(video: Express.Multer.File) {
    const videoPath = `./src/tempfolder/${
      'name' in video ? video['name'] : video.originalname
    }`;

    writeFileSync(videoPath, video.buffer);
    this.makeVideoScreenShot(videoPath);

    const screenShot = readFileSync(videoPath);
    if (screenShot) {
      return screenShot;
    }
    return null;
  }

  async findAll(): Promise<Video[]> {
    return await this.videoModel.find();
  }

  async findOne(id: string): Promise<Video> {
    return await this.videoModel.findOne({ _id: id });
  }

  async upload(video: Express.Multer.File): Promise<Video> {
    const screenShot = this.writeAndReadTempFolder(video);
    const newItem = new this.videoModel({
      userId: 'string',
      screenShot: screenShot ?? '',
    });

    return await (
      await newItem.save()
    )._id;
  }

  async delete(id: string): Promise<Video> {
    return await this.videoModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Video): Promise<Video> {
    return await this.videoModel.findByIdAndUpdate(id, item, { new: true });
  }
}
