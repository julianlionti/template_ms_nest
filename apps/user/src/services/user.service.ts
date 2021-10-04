import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(user: User): Promise<UserDocument> {
    console.log(user);
    return this.userModel.create(user);
  }

  getById(_id: string) {
    return this.userModel.findById(_id);
  }

  async getByUid(user: User): Promise<UserDocument> {
    const { uid } = user;
    const check = await this.userModel.findOne({ uid });
    if (!check) return await this.create(user);
    return check;
  }
}
