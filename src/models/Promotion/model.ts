import mainConfig from '../../env';

import * as mongoose from 'mongoose';

import { Model, Document } from 'mongoose';

interface IPromotionDocument extends Document {
    name: String,
    mg: Number
    moreInformation: String
    price: Number
    createdDt: Date,
    updatedDt: Date
}

export interface IPromotion extends IPromotionDocument {

}

export interface IPromotionModel extends Model<IPromotion> {

}