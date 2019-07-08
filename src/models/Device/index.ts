import * as mongoose from 'mongoose';
import { IDeviceModel, IDevice } from './model';

const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deviceId: {
        type: String,
        required: true
    },
    osType: {
        type: Number,
        required: true
    },
    deviceToken: {
        type: String,
        default: null
    },

    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


const Device: IDeviceModel = mongoose.model<IDevice<any>, IDeviceModel>('Device', schema);
export default Device;