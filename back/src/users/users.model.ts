import * as mongoose from 'mongoose';
import { Role } from '../roles/role.enum';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  mailConfirmed: { type: Boolean },
  password: { type: String, required: true },
  roles: { type: Role },
  stripeId: { type: String },
  invoices: { type: Array},
  advert: { type: Array},
  pricing: { type: Array}
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  email: string;
  mailConfirmed: boolean
  password: string;
  roles: any;
  stripeId: string;
  invoices: any;
  advert: any;
  pricing: any;
}
