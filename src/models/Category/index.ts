import * as mongoose from 'mongoose';
import { ICategoryModel, ICategory } from './model';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        
    },
    img: {
        type: String
    },
    position: {
        type: Number,
        default: 1
    },
    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});

const Category: ICategoryModel = mongoose.model<ICategory, ICategoryModel>('Category', schema);
export default Category;