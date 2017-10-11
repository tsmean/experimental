import {Router, Request, Response, NextFunction} from 'express';
import * as passport from 'passport';
import {PassportInit} from '../../auth-module/passport';
import {dao} from '../../mongo-module/dao';
import {passwordCryptographer} from '../../auth-module/password-cryptographer';
import {Controller, Post, Req, Res} from '@nestjs/common';

@Controller('/login')
export class LoginRouter {

  router: Router = Router();

  /**
   * Initialize the login
   */
  constructor() {
    /**
     * Take login handler and attach to login endpoint, but precede it with authentication
     */
    this.router.post('/login', passport.authenticate(
      'local',
      {
        session: false,
        failWithError: true
      }),
      this.loginHandler, this.errorHandler);
  }

  @Post()
  public loginHandler(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    res.status(200).send({
      message: 'Success',
      status: res.status,
      data: (<any>req).user
    });

  }


  errorHandler(err, req, res, next) {
    res.statusMessage = 'Wrong username or password.';
    res.status(401).send();
  }


}

// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new LoginRouter();
export const loginRouter = intialRouter.router;
