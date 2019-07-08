import * as Joi from 'joi';

import APIError from '../../services/APIError';
// import AdminSchema from '../../schemas/admin';
// import UserSchema from '../../schemas/user';

import { Response, NextFunction } from 'express';
import { getErrorResponse, getResponse, IRequest } from '../mainModels';
// import { IUser } from '../../schemas/user/model';
// import { phoneNumberRegex } from '../mainValidation';
// import { UserRoleEnum } from '../../constants/enums';
// import { IVerifyBody, IChangePasswordBody } from './model';
import { IAdmin } from '../../schemas/admin/model';

export const signin = async (req: IRequest<IAdmin>, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            phoneNumber: Joi.string().regex(/^\d{3}\d{2}\d{2}\d{2}$/).required(),
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, 'sign-in function in auth/validation.ts');
        res.status(500).send(getErrorResponse());
    }

};
export const login = async (req: IRequest<IAdmin>, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            phoneNumber: Joi.string().regex(/^\d{3}\d{2}\d{2}\d{2}$/).required(),
            verificationCode: Joi.number().required(),
            deviceId: Joi.string().required(),
            osType: Joi.number().required()
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, "login function in auth/validation")
        res.status(500).send(getErrorResponse());
    }
}


// export const changePassword = async(req: IRequest<IAdmin>, res: Response, next: NextFunction) => {
//   try {
//     const body: IChangePasswordBody = req.body;
//     const bodyValidationSchema = {
//       email: Joi.string().email().required(),
//       oldPassword: Joi.string().min(6).required(),
//       newPassword: Joi.string().min(6).required()
//     };
//     const result = Joi.validate(req.body, bodyValidationSchema);
//     if (result.error) {
//       return res.send(getResponse(false, result.error.details[0].message));
//     }
//     const admin = await AdminSchema.findOne({ email: body.email });
//     if (!admin) {
//       return res.send(getResponse(false, 'Wrong email'));
//     }
//     req.user = admin;
//     return next();
//   } catch (e) {
//     new APIError(e, 500, 'forgotPassword function in auth/validation.ts');
//     return res.status(500).send(getErrorResponse());
//   }
// };

// export const sendSms = async(req: IRequest<IUser>, res: Response, next: NextFunction) => {
//   try {
//     const bodyValidationSchema = {
//       phoneNumber: Joi.string().regex(phoneNumberRegex).required(),
//     };
//     const result = Joi.validate(req.body, bodyValidationSchema);
//     if (result.error) {
//       return res.send(getResponse(false, result.error.details[0].message));
//     }
//     const user = await UserSchema.findOne({ phoneNumber: req.body.phoneNumber, blocked: true });
//     if (user) return res.send(getResponse(false, 'Wrong phoneNumber'));
//     return next();
//   } catch (e) {
//     new APIError(e, 500, 'login function in auth/validation.ts');
//     return res.status(500).send(getErrorResponse());
//   }
// };

// export const verify = async(req: IRequest<IUser>, res: Response, next: NextFunction) => {
//   try {
//     const body: IVerifyBody = req.body;
//     const bodyValidationSchema = {
//       phoneNumber: Joi.string().regex(phoneNumberRegex).required(),
//       verificationKey: Joi.string().length(4).required(),
//       deviceId: Joi.string().required(),
//       deviceToken: Joi.string().allow('').required(),
//       osType: Joi.number().min(1).max(2).required(),
//       language: Joi.number().min(1).max(2).optional()
//     };
//     const bodyResult = Joi.validate(body, bodyValidationSchema);
//     if (bodyResult.error) return res.send(getResponse(false, bodyResult.error.details[0].message));
//     const user = await UserSchema.findOne({ phoneNumber: body.phoneNumber, blocked: false, verificationKey: { $ne: null } });
//     if (!user) return res.send(getResponse(false, 'Wrong phoneNumber'));
//     req.user = user;
//     return next();
//   } catch (e) {
//     new APIError(e, 500, 'login function in auth/validation.ts');
//     return res.status(500).send(getErrorResponse());
//   }
// };
