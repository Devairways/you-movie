import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SingleUserResponse,
  User,
  UserArrayResponse,
} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<UserArrayResponse> {
    const response = await this.userModel.find();
    return { users: response };
  }

  async findOne(id: string): Promise<SingleUserResponse> {
    const response = await this.userModel.findOne({ _id: id });
    return { user: response };
  }

  async create(item: User): Promise<SingleUserResponse> {
    const newItem = new this.userModel(item);
    const response = await newItem.save();
    return { user: response };
  }

  async delete(id: string): Promise<SingleUserResponse> {
    const response = await this.userModel.findByIdAndRemove(id);
    return { user: response };
  }

  async update(id: string, item: User): Promise<SingleUserResponse> {
    const response = await this.userModel.findByIdAndUpdate(id, item, {
      new: true,
    });
    return { user: response };
  }
}
