import { Module } from '@nestjs/common';
import {MongoDAO} from './mongo-dao';
import {MongoConnector} from './mongo-connector';

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
