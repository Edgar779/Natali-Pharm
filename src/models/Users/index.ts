import * as mongoose from 'mongoose';
import { IUserModel, IUser } from './model';
import { emit } from 'cluster';
import { any, number } from 'joi';
// import { UserRoleEnum } from '../../constants/enums';

const Schema = mongoose.Schema;

const schema = new Schema({
    devices: [{
        type: Schema.Types.ObjectId,
        ref: "Device"
    }],
    phoneNumber: {
        type: String
    },

    verificationCode: {
        type: String
    },
    deviceId: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        default: 1
    },
    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Users: IUserModel = mongoose.model<IUser, IUserModel>('User', schema);
export default Users;