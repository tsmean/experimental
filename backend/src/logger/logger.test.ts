import {log} from './logger';

describe('Logger', () => {

  it('should be able to log', () => {
    log.info('Hello');
    log.warn('World.');
    log.debug('You are');
    log.error('nice.');
  });

});
