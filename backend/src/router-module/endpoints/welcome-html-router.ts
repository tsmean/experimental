import {Router, Request, Response, NextFunction} from 'express';
import {Controller, Get} from '@nestjs/common';

@Controller('/')
export class WelcomeHtmlRouter {

  @Get()
  public welcome(req: Request, res: Response, next: NextFunction) {
    res.status(200)
        .send(`<html><head><title>Welcome</title></head><body><p>Welcome to the TSMEAN Rest Api!</p></body></html>`);
  }

}
