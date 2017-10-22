const winston = require('winston');
import {Component} from '@nestjs/common';

@Component()
export class Log {

  readonly info;
  readonly warn;
  readonly debug;
  readonly error;

  constructor() {
    const logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console()
      ]
    });

    this.info = logger.info.bind(logger);
    this.warn = logger.warn.bind(logger);
    this.debug = logger.debug.bind(logger);
    this.error = logger.error.bind(logger);

  }

}
