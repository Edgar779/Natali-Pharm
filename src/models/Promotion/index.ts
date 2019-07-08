import * as mongoose from 'mongoose';
import { IPromotionModel, IPromotion } from './model';
import { emit } from 'cluster';
import { any } from 'joi';
// import { UserRoleEnum } from '../../constants/enums';

const Schema = mongoose.Schema;

const schema = new Schema({
    images: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    },

    //  400mg 02972 Esthe Neture 2000amd

    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Promotion = mongoose.model<IPromotion, IPromotionModel>('Promotion', schema);
export default Promotion;