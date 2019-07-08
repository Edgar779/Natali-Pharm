import { Router, Response } from 'express';

// import * as Validations from './validation';
import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
// import { IUser } from '../../schemas/user/model';
import APIError from '../../services/APIError';
import { IAdmin } from '../../schemas/admin/model';
// import jwtValidation from '../jwtValidation';

class ShoppingRoutes {
    public router = Router();

    constructor() {
        this.routes();
    }

    private routes = () => {
        /** POST api/auth/login - Login functionality for admin with email and password */
        this.router.post('/', this.addCart);
        // this.router.post('/addsomething', this.addsomething);

    }
    private addCart = async (req: IRequest<IAdmin>, res: Response) => {
        try {
            const response = await Services.addCart(req.body);
            res.send(response);
        }

        catch (e) {
            new APIError(e, 500, 'addCart function in shopping/service.ts');
            res.status(500).send(getErrorResponse());
        }
    }
    // private addsomething = async (req: IRequest<IAdmin>, res: Response) => {
    //     try {
    //         const additem: Object = {
    //             title: req.body.title, 
    //             text: req.body.text
    //         }
    //         const response = await Services.addSomething(additem);
    //         res.send(response);
    //     }

    //     catch (e) {
    //         new APIError(e, 500, 'addCart function in shopping/service.ts');
    //         res.status(500).send(getErrorResponse());
    //     }
    // }
}

export default new ShoppingRoutes().router;