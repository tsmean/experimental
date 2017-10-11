import {userDAO} from '../../auth-module/user-dao';
import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {dao} from '../../mongo-module/dao';
import {Request, Response} from 'express';
import {User} from '../../../../shared/models/user.model';
import {UserDAO} from '../../src/user/user-dao';

// STASHED


@Controller('users')
export class UserController {

  @Post()
  postHandler(req: Request, res: Response) {
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
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getHandler(@Req() req: Request, @Res() res: Response) {
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
