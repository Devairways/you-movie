import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from 'src/interfaces/video.interface';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel('Video') private readonly videoModel: Model<Video>,
  ) {}

  async findAll(): Promise<Video[]> {
    return await this.videoModel.find();
  }

  async findOne(id: string): Promise<Video> {
    return await this.videoModel.findOne({ _id: id });
  }

  async upload(file: Express.Multer.File): Promise<Video> {
    const newItem = new this.videoModel({
      userId: 'string',
      screenShot: file.buffer.toString(),
      video: file.buffer.toString(),
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
