import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Prop()
  uid: string;

  @Prop()
  email: string;

  @Prop()
  displayName: string;

  @Prop()
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
