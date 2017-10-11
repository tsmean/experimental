import {appConfig} from './config/app-config';
import { NestFactory } from '@nestjs/core';
import {AppModule} from './app.module';
import {MongoConnector} from './mongo-module/database';
import * as bodyParser from 'body-parser';
import {ValidationPipe} from './common/pipes/validation.pipe';

export function main() {

  // Step 1) Set & Get App Configuration
  appConfig.setAppConfig(process.argv[2] || 'local');

  // Step 2) Connect to the database
  // TODO: de-hardcode
  const connector = new MongoConnector();
  connector.connectToDatabase(appConfig.appConfig.db, (db) => {

    // when connected to db:

    async function bootstrap() {
      const app = await NestFactory.create(AppModule);

      app.use(bodyParser.json());
      app.useGlobalPipes(new ValidationPipe());

      await app.listen(4242);
    }
    bootstrap();


  });

};

main();
