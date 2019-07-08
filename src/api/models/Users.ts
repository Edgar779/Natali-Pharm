
import mainConfig from '../../env';


import * as mongoose from 'mongoose';
import { strict, string } from 'joi';
mongoose.connect(mainConfig.MONGO_URL, { useNewUrlParser: true });




export interface IUser extends Document {
    phoneNumber: String,
    verificationCode: String,
    createdDt: Date,
    updatedDt: Date
}

const UserSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true, unique: true},
    verificationCode:{type: String, required: true},
    createdDt: Date,
    updatedDt: Date
});

const a = mongoose.model("User", UserSchema);

export default a;
