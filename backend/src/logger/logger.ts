import * as bunyan from 'bunyan';
import {Component} from '@nestjs/common';

@Component()
export class Log {

  readonly info;
  readonly warn;
  readonly debug;
  readonly error;

  constructor() {
    const bunyanLogger = bunyan.createLogger({
      name: 'logger',
      level: 0
    });

    this.info = bunyanLogger.info.bind(bunyanLogger);
    this.warn = bunyanLogger.warn.bind(bunyanLogger);
    this.debug = bunyanLogger.debug.bind(bunyanLogger);
    this.error = bunyanLogger.error.bind(bunyanLogger);
  }

}
