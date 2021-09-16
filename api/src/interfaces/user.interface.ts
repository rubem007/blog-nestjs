import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly password?: string;
  readonly image?: string;
  readonly role?: string;
}
