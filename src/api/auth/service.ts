// import * as bcrypt from 'bcrypt';
import { sendVerificationCodeViaSMS } from "../../services/sms-sender";
import * as bcrypt from "bcrypt";
import Users from "../../models/Users";
import Device from "../../models/Device";
import { string } from "joi";
import * as jwt from "jsonwebtoken";
// import { IUser } from '../../schemas/user/model';
// import UserSchema   from '../../schemas/user';
// import { ILoginBody, ISendSmsBody, IVerifyBody, IChangePasswordBody } from './model';
import { getResponse, IResponseModel, getErrorResponse, IRequest } from '../mainModels';

import mainConfig from '../../env';
import { fileURLToPath } from "url";
import { IDevice } from '../../models/Device/model';
import { IUser } from '../../models/Users/model';
import { roleEnum } from "../../constants/enums";
import admin from "../../schemas/admin";
import { IAdmin } from "../../schemas/admin/model";
// import { IAdmin } from "../../schemas/admin/model";
// import { Model } from "mongoose";
// import { IAdmin } from "src/schemas/admin/model";
// import { LanguageEnum, UserRoleEnum } from '../../constants/enums';
// import { IAdmin } from '../../schemas/admin/model';
// import { sendVerificationCodeViaSMS } from '../../services/sms-sender';

class AuthServices {

  public signin = async (number: string) => {
    let verificationCode = Math.floor(1000 + Math.random() * 9000);
    const result = await sendVerificationCodeViaSMS(verificationCode, number);
    // const authToken = jwt.sign({ _id: admin._id, userRole: admin.userRole, deviceId: null }, mainConfig.JWT_SECRET, { expiresIn: '7d' });
    const user: any = new Users({ phoneNumber: number, verificationCode: verificationCode });
    user.save();
    return getResponse(true, "successfully loged in")

    // const validPassword = bcrypt.compareSync(body.password, admin.password);
    // if (!validPassword) return getResponse(false, 'Wrong password');
    // const authToken = jwt.sign({ _id: admin._id, userRole: admin.userRole, deviceId: null }, mainConfig.JWT_SECRET, { expiresIn: '7d' });
    // return getResponse(true, 'Successfully logged in', { token: authToken, email: body.email });
  }




  public login = async (number: string, verificationCode: number, deviceId: number, osType: number, deviceToken: string) => {
    const user = await Users.findOne({ phoneNumber: number, verificationCode: verificationCode });

    const findDevice: Array<IDevice<IUser>> = await Device.find({ deviceId }).populate('user');
    if (!user) {
      return getResponse(false, "user is not found");
    }
    for (let i = 0; i < findDevice.length; i++) {
      const index = findDevice[i].user.devices.indexOf(findDevice[i].id);

      if (index > -1) {
        findDevice[i].user.devices.splice(index, 1);
      }
      findDevice[i].user.save()

      findDevice[i].remove();

      findDevice[i].save()

    }


    const device = new Device({ user: user.id, deviceId, osType, deviceToken });

    await device.save();
    user.devices.push(device._id);
    await user.save();
    let token = jwt.sign({ _id: user._id, deviceId: device._id, role: roleEnum.user },
      mainConfig.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );
    return getResponse(true, "verification code is valid", token);
  }

  public loginAdmin = async (adminEmail: any, adminPassword: any) => {
    const findAdmin = await admin.findOne({ email: adminEmail });
    if (!findAdmin) {
      return getResponse(false, "admin was not founded");
    }
    const comparePassword = await bcrypt.compare(adminPassword, findAdmin.password);
    if (!comparePassword) {
      return getResponse(false, "Incorrect password");
    }
    let token = await jwt.sign({ _id: findAdmin._id, role: roleEnum.admin },
      mainConfig.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    );

    return getResponse(true, "Admin successfuly logged in", token);
  }



  //  await bcrypt.hash(adminPassword, 10, (err: any, hash: any) => {
  // const createAdminn = new admin({email: adminEmail, password: hash});
  // createAdminn.save();
  // });
  // const admin = await Users.findOne({ email: email });
  // if (!admin) {
  //   return getResponse(false, "No administrator was found");
  // }
  // let token = jwt.sign({ email: email },
  //   mainConfig.JWT_SECRET,
  //   {
  //     expiresIn: '24h'
  //   }
  // );
  // return getResponse(true, "admin was found", token);

}









//   public changePassword = async(admin: IAdmin, body: IChangePasswordBody): Promise<IResponseModel> => {
//     const validPassword = bcrypt.compareSync(body.oldPassword, admin.password);
//     if (!validPassword) {
//       return getResponse(false, 'Wrong oldPassword');
//     }
//     const hashedPassword = bcrypt.hashSync(body.newPassword, 12);
//     admin.password = hashedPassword;
//     await admin.save();
//     return getResponse(true, 'Password updated');
//   }

//   public sendSms = async(body: ISendSmsBody): Promise<IResponseModel> => {
//     const verificationKey = this.generateRandom('00123456789', 4);
//     await this.createOrUpdateUser(body.phoneNumber, verificationKey);
//     const message = `Your verification code for Paradox - ${verificationKey}. You can now enter in your account`;
//     sendVerificationCodeViaSMS(message, body.phoneNumber).catch(e => console.log(e));
//     return getResponse(true, 'Sms sent', verificationKey);
//   }

//   public verify = async(user: IUser, body: IVerifyBody): Promise<IResponseModel> => {
//     const verificationPassed = bcrypt.compareSync(body.verificationKey, user.verificationKey);
//     if (!verificationPassed) return getResponse(false, 'Wrong verification key');
//     await UserSchema.updateMany({ _id: { $ne: user._id}, deviceId: body.deviceId }, { deviceId: null, deviceToken: null });
//     user.isVerified = true;
//     user.deviceId = body.deviceId;
//     if (body.deviceToken) user.deviceToken = body.deviceToken;
//     user.osType = body.osType;
//     user.language = body.language || LanguageEnum.hy;
//     // if (!user.card) {
//     //   const userCard = new UserCardSchema({
//     //     user: user._id,
//     //   });
//     //   user.card = userCard._id;
//     //   await Promise.all([
//     //     await user.save(),
//     //     await userCard.save()
//     //   ]);
//     // } else {
//     //   await user.save();
//     // }
//     await user.save();
//     const authToken = jwt.sign({ _id: user._id, deviceId: user.deviceId, userRole: UserRoleEnum.user }, mainConfig.JWT_SECRET, { expiresIn: '25d' });
//     return getResponse(true, 'Logged in successfully', authToken);
//   }

//   public logout = async(user: IUser): Promise<IResponseModel> => {
//     user.deviceId = null;
//     user.deviceToken = null;
//     return getResponse(true, 'Logged out');
//   }

//   private generateRandom(charset: string, length: number) {
//     let text = '';
//     for (let i = 0; i < length; i++) {
//       const char = charset.charAt(Math.ceil(Math.random() * (charset.length - 1)));
//       text += char;
//     }
//     return text;
//   }

//   private async createOrUpdateUser(phoneNumber: string, verificationKey: string) {
//     const hashedCode = bcrypt.hashSync(verificationKey, 12);
//     const user = await UserSchema.findOneAndUpdate({ phoneNumber }, { verificationKey: hashedCode });
//     if (!user) {
//       // const nid = await this.getUserNid();
//       await UserSchema.create({
//         // nid,
//         phoneNumber,
//         verificationKey: hashedCode,
//       });
//     }
//   }

//   private async getUserNid(): Promise<number> {
//     let count = await UserSchema.countDocuments();
//     return ++count;
//   }



export default new AuthServices();