import mongoose, { Document, Mongoose } from 'mongoose';

export default interface Employee extends Document {
  firstName: string;
  lastName: string;
  company: string | mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  phone: string;
  compare: (pass: string, hash: string) => Promise<boolean>;
  toObject: () => any;
}
