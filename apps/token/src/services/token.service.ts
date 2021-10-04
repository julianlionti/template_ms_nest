import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from '../schemas/token.schema';

export type SuccessToken = { token: string };
type Decoded = { exp: number; userId: any };

const expiresIn = 30 * 24 * 60 * 60;

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Token') private readonly tokenModel: Model<Token>,
  ) {}

  async create(userId: string): Promise<TokenDocument> {
    const token = this.jwtService.sign({ userId }, { expiresIn });
    return this.tokenModel.findOneAndUpdate(
      { userId },
      { token },
      { upsert: true, new: true },
    );
  }

  async decode(token: string): Promise<string | null> {
    if (!token) return null;

    const finalToken = token.replace('Bearer ', '').replace('bearer ', '');
    const tokenModel = await this.tokenModel.findOne({ token: finalToken });
    if (!tokenModel) return null;

    try {
      const decoded = this.jwtService.decode(tokenModel.token) as Decoded;
      return decoded.userId;
    } catch (ex) {
      return null;
    }
  }

  async clean(_id: string) {
    await this.tokenModel.deleteOne({ userId: _id });
  }
}
