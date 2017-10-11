import { Module } from '@nestjs/common';
import {MongoModule} from '../mongo-module/mongo.module';
import {DAO} from '.';

@Module({
  components: [
    DAO
  ],
  exports: [
    DAO
  ],
  modules: [
    MongoModule
  ]
})
export class DbadapterModule {}
