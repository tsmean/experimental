import {Router, Request, Response, NextFunction} from 'express';
import {dao} from '../../mongo-module';
import {userDAO} from '../../auth-module/user-dao';
import {Controller, Get, Post} from '@nestjs/common';

@Controller()
export class UserRouter {
  router: Router;

  /**
   * Take login handler and attach to login endpoint, but precede it with authentication
   */
  init() {
    this.router.post('/users', this.postHandler);
    this.router.get('/users/:id', this.getHandler);
  }

  /**
   * Initialize the login
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  @Post()
  postHandler(req: Request, res: Response, next: NextFunction) {
    userDAO.create(req.body.user, req.body.password, (dbResponse => {
      if (dbResponse.error) {
        if (dbResponse.error.message === 'User already exists') {
          res.statusMessage = dbResponse.error.message;
          res.status(403).send();
        } else {
          res.statusMessage = dbResponse.error.message;
          res.status(500).send();
        }
      } else {
        res.status(200).send({
          message: 'Success',
          status: res.status,
          data: dbResponse.data
        });
      }
    }));
  }

  @Get()
  getHandler(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

    dao.read(userId, 'users', (dbResp) => {
      if (dbResp.error) {
        res.status(500).send({
          message: 'Server error',
          status: res.status
        });
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status,
              data: dbResp.data
            });
      }
    });
  }

}

// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new UserRouter();
intialRouter.init();

export const userRouter = intialRouter.router;
