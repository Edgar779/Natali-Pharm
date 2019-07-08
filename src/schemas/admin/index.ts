import * as mongoose from 'mongoose';
import { IAdminModel, IAdmin } from './model';
import { roleEnum } from '../../constants/enums';

const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: roleEnum.admin
  },
  createdDt: {
    type: Date,
    default: Date.now
  },
  updatedDt: {
    type: Date,
    default: Date.now
  }
});

export const admin: IAdminModel = mongoose.model<IAdmin, IAdminModel>('Admin', schema);
export default admin;