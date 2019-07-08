import * as mongoose from 'mongoose';
import { IOrderModel, IOrder} from './model';
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

    //  400mg 02972 Esthe Neture 2000amd

    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Order = mongoose.model<IOrder, IOrderModel>('Medicine', schema);
export default Order;