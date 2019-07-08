
import mainConfig from '../../env';

import * as mongoose from 'mongoose';

import { Model, Document } from 'mongoose';

interface IUserDocument<D = string> extends Document {
    devices: Array<D>;
    phoneNumber: String,
    verificationCode: String,
    email: { type: String },
    password: { type: String },
    createdDt: Date,
    updatedDt: Date
}

export interface IUser extends IUserDocument {

}

export interface IUserModel extends Model<IUser> {

}