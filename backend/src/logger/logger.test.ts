import {Log} from './logger';
import {Test} from '@nestjs/testing';

describe('Logger', () => {

  let log;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      components: [
        Log
      ]
    }).compile();

    log = module.get<Log>(Log);
  });

  // TODO: figure out why the logs aren't printed in order...
  it('should be able to log', () => {
    log.info('Hello');
    log.warn('World.');
    log.debug('You are');
    log.error('nice.');
  });

});
