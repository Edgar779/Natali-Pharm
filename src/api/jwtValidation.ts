import * as jwt from 'jsonwebtoken';

import AdminSchema from '../schemas/admin';

import APIError from '../services/APIError';
import mainConfig from '../env';
import { token } from 'morgan';
import { getResponse, IResponseModel, getErrorResponse } from './mainModels';

import { Request, Response, NextFunction } from 'express';
import { IRequest } from './mainModels';
import { roleEnum } from '../constants/enums';
import User from "../models/Users"
import { IUserModel, IUser } from '../models/Users/model';
import { IAdmin } from '../schemas/admin/model';

import Device from '../models/Device';


const createJwtValidation = (userTypes: number[]) => {
	return async (req: IRequest<IUser | IAdmin>, res: Response, next: NextFunction) => {
		try {
			const bearerToken = req.headers.authorization;
			if (!bearerToken) return res.sendStatus(401);
			const token = bearerToken;
			jwt.verify(token, mainConfig.JWT_SECRET, async (error, dtls: any) => {
				if (error) {
					new APIError('UNAUTHORIZED', 401);
					return res.sendStatus(401);
				}
				if (!userTypes.includes(dtls.role)) {
					new APIError('UNAUTHORIZED', 401);
					return res.sendStatus(401);
				}

				if (dtls.role === roleEnum.user) {

					const user = await User.findOne({ _id: dtls._id });
				
					if (user.devices[0] == dtls.deviceId) {
						req.user = user;
						return next();
					} else {
						new APIError('UNAUTHORIZED', 401);
						return res.sendStatus(401);
					}	
				}
				 else {
					const admin = await AdminSchema.findOne({ _id: dtls._id, role: dtls.role });
					if (admin) {
						req.user = admin;
						return next();
					} else {
						new APIError('UNAUTHORIZED', 401);
						return res.sendStatus(401);
					}
				 }
			});
		} catch (err) {
			new APIError(err.message ? err.message : 'INTERNAL SERVER ERROR', 500);
			return res.sendStatus(500);
		}
	};
};

export default {
	validateUser: createJwtValidation([roleEnum.admin, roleEnum.user]),
	validateAdmin: createJwtValidation([roleEnum.admin])

};

interface IJwtDetails {
	_id: string;
	deviceId: string;
	role: number;
	iat: number;
	exp: number;
}