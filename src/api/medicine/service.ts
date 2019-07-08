// // import * as bcrypt from 'bcrypt';
// import { sendVerificationCodeViaSMS } from "../../services/sms-sender";
// import Users from "../../models/Users";
import Medicine from "../../models/Medicine";
import { string } from "joi";
// import { string } from "joi";
// import * as jwt from "jsonwebtoken";
// // import { IUser } from '../../schemas/user/model';
// // import UserSchema   from '../../schemas/user';
// // import { ILoginBody, ISendSmsBody, IVerifyBody, IChangePasswordBody } from './model';
// import { getResponse, IResponseModel, getErrorResponse } from '../mainModels';
// // import {checktoken} from '../jwtValidation';
// import mainConfig from '../../env';

class MedicineServices {

    public pills = async () => {
        // gtnel sax A-req.params.A ov sksvox dexer@
        // const medicine = await Medicine.find({name: })
        const medicine = await Medicine.find().limit(10);
        return medicine
    }
    // Search input
    public searchPills = async (name: string) => {
        const searchPills = await Medicine.find({ name });
        return searchPills;
    }
    public pillsinformation = async (id: string) => {
        let pillName;
        const pillsInformation = await Medicine.findById({ _id: id });
        pillName = pillsInformation.name;
        const similarPills = await Medicine.find({ name: pillName });
        await pillsInformation.similar.push(similarPills);

        return pillsInformation
    }
}

export default new MedicineServices();