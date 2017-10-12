import { Module } from '@nestjs/common';
import {MongoDAO} from './dao';
import {MongoConnector} from './database';

@Module({
  components: [
    MongoDAO,
    MongoConnector
  ],
  exports: [
    MongoDAO,
    MongoConnector
  ]
})
export class MongoModule {}
