import * as express from 'express';

import AuthRoutes from './auth';
import HomeRoutes from './home';
import MedicineRoutes from './medicine';
import ShoppingRoutes from "./shopping";
class Routes {

  public router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.use('/auth', AuthRoutes);
    this.router.use('/home', HomeRoutes);
    this.router.use('/medicine', MedicineRoutes);
    this.router.use('/shopping', ShoppingRoutes);
  }
}

export default new Routes().router;