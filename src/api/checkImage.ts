
// import APIError from '../services/APIError';

// import { Request, Response, NextFunction } from 'express';
// import { getResponse } from "./mainModels";

// export const checkCorrectImage = (mimetype: any) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             if (mimetype === "image/png" ||
//                 mimetype === "image/jpg" ||
//                 mimetype === "image/jpeg") {
//                 next();
//                 // return getResponse(true, "Correct image")
//             }
//             else {
//                 console.log('mtav');
//                 return getResponse(false, "Incorrect image");
//             }

//         } catch (err) {
//             new APIError(err.message ? err.message : 'INTERNAL SERVER ERROR', 500);
//             return res.sendStatus(500);
//         }
//     };
// };

// export default {
//     checkCorrectImage: checkCorrectImage

// };