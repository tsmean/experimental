import * as http from 'http';
import {log} from './logger/logger';
import {appConfig} from './config/app-config';
import {database} from '../mongo-module';
import {router} from '../router-module';

import { NestFactory } from '@nestjs/core';
import {AppModule} from './app.module';

export function main() {

  // Step 1) Set & Get App Configuration
  appConfig.setAppConfig(process.argv[2] || 'local');

  // Step 2) Connect to the database
  database.connectToDatabase(appConfig.appConfig.db, (db) => {

    // when connected to db:

    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      await app.listen(4242);
    }
    bootstrap();


  });

};

main();
