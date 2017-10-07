import * as express from 'express';
import {welcomeHtmlRouter} from './endpoints/welcome-html-router';
import {loginRouter} from './endpoints/login-router';
import {simpleCrudRouter} from './endpoints/simple-crud-router';
import {userRouter} from './endpoints/user-router';
import * as bodyParser from 'body-parser';
import {passportInit} from '@tsmean/auth';

// Creates and configures an ExpressJS web server.
class Router {

  // ref to Express instance
  public appRouter: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.appRouter = express();
    this.appRouter.use(bodyParser.json());
    this.appRouter.use(bodyParser.urlencoded({ extended: false }));

    // passport config
    passportInit.init(this.appRouter);

    // intercept favicon
    this.appRouter.get('/favicon.ico', function(req, res) {
      res.status(204);
    });

    this.routes();
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router();

    // Allow CORS since frontend is served completely independently
    this.appRouter.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, PATCH');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    this.appRouter.use('/', welcomeHtmlRouter);

    // API
    this.appRouter.use('/api/v1/', loginRouter);
    this.appRouter.use('/api/v1/', userRouter);

    // The simpleCrudRouter one should stay last, since it covers quite a broad range of requests and if it's moved above
    // it will steal away the endpoints of the more specific implementations
    this.appRouter.use('/api/v1/', simpleCrudRouter);

  }

}

export const router = new Router().appRouter;
