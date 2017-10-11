import {WelcomeHtmlRouter} from './welcome-html-router';
import { Test } from '@nestjs/testing';

describe('Test simple welcome Html Router', () => {

  let welcomeRouter: WelcomeHtmlRouter;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [WelcomeHtmlRouter]
    }).compile();

    welcomeRouter = module.get<WelcomeHtmlRouter>(WelcomeHtmlRouter);
  });

  it('should return html containing the word welcome', async () => {
    // TODO: How can I test this?
    // expect(await welcomeRouter.welcome()).toContain('Welcome');
  });

});
