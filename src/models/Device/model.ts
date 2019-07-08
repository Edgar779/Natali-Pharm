import { Model, Document } from 'mongoose';

interface IDeviceDocument<U = string> extends Document {
    user: U;
    deviceId: string;
    osType: string; 
    deviceToken: number;
    createdDt: Date;

    updatedDt: Date;
}

export interface IDevice<U = string> extends IDeviceDocument<U> {

}

export interface IDeviceModel extends Model<IDevice<any>> {

}