import { Model, Document } from 'mongoose';

interface ICategoryDocument extends Document {
    name: String;
    img: String;
    position: Number;
    createdDt: Date;

    updatedDt: Date;
}

export interface ICategory extends ICategoryDocument {

}

export interface ICategoryModel extends Model<ICategory> {

}