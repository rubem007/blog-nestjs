import { Document } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export interface PostInterface extends Document {
  readonly user: User;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly isPublished: boolean;
  readonly Created_at: Date;
  readonly updated_at: Date;
}
