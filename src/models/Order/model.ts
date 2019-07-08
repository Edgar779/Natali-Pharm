import mainConfig from '../../env';

import * as mongoose from 'mongoose';

import { Model, Document } from 'mongoose';

interface IOrderDocument extends Document {
    name: String,
    mg: Number
    moreInformation: String
    price: Number
    createdDt: Date,
    updatedDt: Date
}

export interface IOrder extends IOrderDocument {

}

export interface IOrderModel extends Model<IOrder> {

}