
import mainConfig from '../../env';

import * as mongoose from 'mongoose';

import { Model, Document } from 'mongoose';

interface IMedicineDocument extends Document {
    name: String,
    mg: Number
    moreInformation: String
    price: Number
    similar: Array<Object>,
    createdDt: Date,
    updatedDt: Date
}

export interface IMedicine extends IMedicineDocument {

}

export interface IMedicineModel extends Model<IMedicine> {

}