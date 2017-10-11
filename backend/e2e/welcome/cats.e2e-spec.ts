import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {WelcomeHtmlController} from '../../src/router-module/endpoints/welcome-html-router';

describe('Welcome Router', () => {
  const server = express();
  server.use(bodyParser.json());

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      modules: [WelcomeHtmlController],
    }).compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(server)
      .get('/cats')
      .expect(200)
      .expect({
        data: 'hi',
      });
  });
});
