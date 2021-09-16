import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/auth/roles/roles.decorator';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  image: string;

  @Prop({ enum: Role })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
