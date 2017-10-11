import { Module } from '@nestjs/common';
import {MongoDAO} from './dao';

@Module({
  components: [
    MongoDAO
  ],
  exports: [
    MongoDAO
  ]
})
export class MongoModule {}
