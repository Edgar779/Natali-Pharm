// // import * as bcrypt from 'bcrypt';
// import { sendVerificationCodeViaSMS } from "../../services/sms-sender";
// import Users from "../../models/Users";
import Medicine from "../../models/Medicine";
import Promotion from "../../models/Promotion/";
import { string } from "joi";
import { ObjectId } from "bson";
// import { string } from "joi";
// import * as jwt from "jsonwebtoken";
// // import { IUser } from '../../schemas/user/model';
// // import UserSchema   from '../../schemas/user';
// // import { ILoginBody, ISendSmsBody, IVerifyBody, IChangePasswordBody } from './model';
// import { getResponse, IResponseModel, getErrorResponse } from '../mainModels';
// // import {checktoken} from '../jwtValidation';
// import mainConfig from '../../env';
class ShoppingServices {
    public addCart = async (body: any) => {
        const findPill = Medicine.find({ _id: {$in: JSON.parse(body.id) }});
        return findPill;
    }
    // public addSomething = async (item: Object) => {
    //     const insertPromotions = new Promotion(item);
    //     await insertPromotions.save();
    //     return insertPromotions
    // }
}
export default new ShoppingServices();