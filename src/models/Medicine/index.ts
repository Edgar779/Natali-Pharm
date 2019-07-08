import * as mongoose from 'mongoose';
import { IMedicineModel, IMedicine} from './model';
import { emit } from 'cluster';
import { any } from 'joi';
// import { UserRoleEnum } from '../../constants/enums';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
    },
    mg: {
        type: Number
    },
    moreInformation: {
        type: String
    },
    price: {
        type: Number
    },
    similar: [{
        type: Object
    }],

    //  400mg 02972 Esthe Neture 2000amd

    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Medicine = mongoose.model<IMedicine, IMedicineModel>('Medicine', schema);
export default Medicine;