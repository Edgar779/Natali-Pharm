import { Model, Document } from 'mongoose';

interface IAdminDocument extends Document {
  email: string;
  password: string;
  role: Number;
  osType: Number
  createdDt: Date;
  updatedDt: Date;
}
  
export interface IAdmin extends IAdminDocument {

}

export interface IAdminModel extends Model<IAdmin> {

}