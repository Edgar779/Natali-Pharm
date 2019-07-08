import { Router, Response } from 'express';

// import * as Validations from './validation';
import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
// import { IUser } from '../../schemas/user/model';
import APIError from '../../services/APIError';
import { IAdmin } from '../../schemas/admin/model';
import { string } from 'joi';
import jwtValidation from '../jwtValidation';
import Category from "../../models/Category";
import * as Validations from './validation';

import * as multer from 'multer'
const upload = multer({ dest: 'uploads/' }); // multer configuration

class HomeRoutes {
  public router = Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    /** POST api/auth/login - Login functionality for admin with email and password */
    this.router.get('/getcategory', jwtValidation.validateUser, this.getCategory);
    this.router.post('/addcategory', jwtValidation.validateAdmin, upload.single('category'), this.addCategory);
    this.router.get('/sortcategory/:old/:new', jwtValidation.validateAdmin, this.sortCategory);
    this.router.post('/addpromotions', jwtValidation.validateAdmin, this.addPromotion);
    // this.router.post('/addpill', jwtValidation.validateAdmin, this.addPill);
  }
  private getCategory = async (req: IRequest<IAdmin>, res: Response) => {
    try {
      const response = await Services.getCategory();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getCategory function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  private sortCategory = async (req: IRequest<IAdmin>, res: Response) => {
    try {
      
      const response = await Services.sortCategory(req.params.old, req.params.new);
      res.send(response);
    }

    catch (e) {
      new APIError(e, 500, 'addCategory function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  private addCategory = async (req: IRequest<IAdmin>, res: Response) => {
    try {
      // console.log(req.file);
      const response = await Services.addCategory(req.file, req.body.name);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'addCategory function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }

  // private addPill = async (req: IRequest<IAdmin>, res: Response) =>{
  //   try {
  //     const response = await Services.addPill(req.file, req.body.name);
  //     res.send(response);
  //   } catch (e) {
  //     new APIError(e, 500, 'addPromotion function in home/service.ts');
  //     res.status(500).send(getErrorResponse());
  //   }
  // }
  private addPromotion = async (req: IRequest<IAdmin>, res: Response) => {
    try {
      const response = await Services.addPromotion(req.file, req.body.name);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'addPromotion function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
}
export default new HomeRoutes().router;