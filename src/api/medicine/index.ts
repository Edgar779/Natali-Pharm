import { Router, Response } from 'express';

// import * as Validations from './validation';
import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
// import { IUser } from '../../schemas/user/model';
import APIError from '../../services/APIError';
import { IAdmin } from '../../schemas/admin/model';
import jwtValidation from '../jwtValidation';

class Medicine {
  public router = Router();

  constructor() {
    this.routes();
  }
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NzM3OTIzNyIsImlhdCI6MTU2MTgyMDMyNCwiZXhwIjoxNTYxOTA2NzI0fQ.qU3UTZDrjDBLU12xryGXfe6_TwadrWslU8hseqf0yGk
  private routes = () => {
    /** POST api/auth/login - Login functionality for admin with email and password */
    this.router.get('/', jwtValidation.validateUser, this.pills);
    this.router.get('/search/:name', this.searchPills);
    this.router.get('/search/details/:pillId', this.pillsinformation);
    // this.router.post('/login', Validations.login, this.login);
    // this.router.post('/login/admin', this.loginAdmin);
    /** POST api/auth/login - Forgot password functionality for admin */
    // this.router.post('/change', Validations.changePassword, this.changePassword);
    // /** POST api/auth/sms - Send sms functionality for user */
    // this.router.post('/sms', Validations.sendSms, this.sendSms);
    // /** POST api/auth/verify - Verify user by verification code and log in */
    // this.router.post('/verify', Validations.verify, this.verify);
    // /** POST api/auth/logout - Logout user */
    // this.router.post('/logout', jwtValidation.validateUser, this.logout);
  }

  private pills = async (req: IRequest<IAdmin>, res: Response) => {
    try {
      const response = await Services.pills();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'Pills function in medicine/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  // Search input
  private searchPills = async (req: IRequest<IAdmin>, res: Response) => {
    try {
      const response = await Services.searchPills(req.params.name);
      res.send(response);
    }
    catch (e) {
      new APIError(e, 500, 'searchPills function in medicine/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  private pillsinformation = async(req: IRequest<IAdmin>, res: Response) =>{
    try{
      const response = await Services.pillsinformation(req.params.pillId);
      res.send(response);
    }
    catch (e) {
      new APIError(e, 500, 'pillsinformation function in medicine/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  //   private login = async (req: IRequest<IAdmin>, res: Response) => {
  //     try {
  //       const response = await Services.login(req.body.phoneNumber, req.body.verificationCode, req.body.deviceId, req.body.osType, req.body.deviceToken)
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'login function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }


  //   private loginAdmin = async (req: IRequest<IAdmin>, res: Response) => {
  //     try {
  //       const response = await Services.loginAdmin(req.body.email);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'loginAdmin function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }
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

export default new Medicine().router;