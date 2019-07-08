import * as Joi from 'joi';

import APIError from '../../services/APIError';
import { Response, NextFunction } from 'express';
import { getErrorResponse, getResponse, IRequest } from '../mainModels';
import { IAdmin } from '../../schemas/admin/model';


// export const addPromotion = async (req: IRequest<IAdmin>, res: Response, next: NextFunction) => {
//     try {
//         const data = req.body;
//         const schema = Joi.object().keys({
//             name: Joi.string().required()
//         });

//         const result = Joi.validate(data, schema);
//         if (result.error) {
//             return res.send(getResponse(false, result.error.details[0].message));
//         }
       
//         // return next();
//     }
//     catch (e) {
//         new APIError(e, 500, 'sign-in function in auth/validation.ts');
//         res.status(500).send(getErrorResponse());
//     }

// };

export const addPromotion = async (req: IRequest<IAdmin>, res: Response, next: NextFunction) => {
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
