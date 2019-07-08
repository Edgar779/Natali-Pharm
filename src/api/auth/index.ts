import { Router, Response } from 'express';

import * as Validations from './validation';
import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
// import { IUser } from '../../schemas/user/model';
import APIError from '../../services/APIError';
import { IAdmin } from '../../schemas/admin/model';
import jwtValidation from '../jwtValidation';
import { IUser } from '../../models/Users/model';

class AuthRoutes {
  public router = Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/signin', Validations.signin, this.signin);
    this.router.post('/login', Validations.login, this.login);
    this.router.post('/login/admin', this.loginAdmin);

  }

  private signin = async (req: IRequest<IUser>, res: Response) => {
    try {
      const response = await Services.signin(req.body.phoneNumber);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'login function in auth/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  private login = async (req: IRequest<IUser>, res: Response) => {
    try {
      const response = await Services.login(req.body.phoneNumber, req.body.verificationCode, req.body.deviceId, req.body.osType, req.body.deviceToken)
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'login function in auth/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }


  private loginAdmin = async (req: IRequest<IAdmin>, res: Response) => {
    try {
      const response = await Services.loginAdmin(req.body.email, req.body.password);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'loginAdmin function in auth/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  //   private changePassword = async(req: IRequest<IAdmin>, res: Response) => {
  //     try {
  //       const response = await Services.changePassword(req.user, req.body);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'changePassword function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

  //   private sendSms = async(req: IRequest<IUser>, res: Response) => {
  //     try {
  //       const response = await Services.sendSms(req.body);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'sendSms function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

  //   private verify = async(req: IRequest<IUser>, res: Response) => {
  //     try {
  //       const response = await Services.verify(req.user, req.body);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'verify function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

  //   private logout = async(req: IRequest<IUser>, res: Response) => {
  //     try {
  //       const response = await Services.logout(req.user);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'logout function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

}

export default new AuthRoutes().router;